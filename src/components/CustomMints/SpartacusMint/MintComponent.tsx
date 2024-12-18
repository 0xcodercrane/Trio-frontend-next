'use client';

import Section from '@/components/Section';
import Socials from '@/components/Socials';
import { ENV, ENVS, ESOCIALS, TRANSACTION_DEFAULT_PARAMETERS_BUY_LISTING, USE_LOW_POSTAGE } from '@/lib/constants';
import { getSocialIcon } from '@/lib/utilities/socials';
import { TSocialsConfig } from '@/types/socials';
import { collection, getCountFromServer, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { getSpartacusApp } from './firebase';
import { Button } from '@/components/ui/button';
import { SpartacusFeesPanel } from './SpartacusFeesPanel';
import { Input } from '@/components/ui/input';
import FeeSelector from '@/components/FeeSelector';
import { toast } from 'sonner';
import { useFeeRates, useWallet } from '@/lib/hooks';
import { TSpartacusOrder } from './types';
import { Loading, Tag } from '@/components/common';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQuery } from '@tanstack/react-query';
import ob from '@/lib/ob';
import { MempoolTx } from '@/components/common/MempoolTx';
import { pushDirectOrderToFirebase } from '@/lib/services/points';
import { auth } from '@/lib/firebase';
import { OrderType } from 'ordinalsbot/dist/types/v1';
import { EOrderSubType, ERewardState } from '@/types';
import { calculateTxVBytes } from '@/lib/utilities';

const SOCIALS_CONFIG: TSocialsConfig = {
  [ESOCIALS.X]: {
    img: getSocialIcon(ESOCIALS.X),
    link: 'https://x.com/projspartacus'
  },
  [ESOCIALS.Web]: {
    img: getSocialIcon(ESOCIALS.Web),
    link: 'https://projectspartacus.xyz'
  }
};

const DEFAULT_VIRTUAL_SIZE = calculateTxVBytes(
  1,
  1,
  TRANSACTION_DEFAULT_PARAMETERS_BUY_LISTING.inputScript,
  TRANSACTION_DEFAULT_PARAMETERS_BUY_LISTING.outputScript
);

const TOTAL_NUMBER_OF_FILES = 76911;
const spartacusApp = getSpartacusApp();
const firestore = spartacusApp && getFirestore(spartacusApp);

enum ESTAGES {
  Select = 'select',
  Pay = 'pay',
  Published = 'published'
}

export function MintComponent() {
  const [filesMinted, setFilesMinted] = useState(0);
  const [fileCount, setFileCount] = useState(5);
  const [order, setOrder] = useState<TSpartacusOrder | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [promptingForCharge, setPromptingForCharge] = useState(false);
  const [txid, setTxid] = useState<string | null>(null);

  const [stage, setStage] = useState<ESTAGES>(ESTAGES.Select);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { feeRate } = useFeeRates();

  const wallet = useWallet();
  const { sendBTC } = useLaserEyes();

  const { data: orderInfo } = useQuery({
    queryKey: ['legacy-order', order?.id],
    queryFn: () => {
      if (order) return ob.Inscription().getOrder(order?.id);
    },
    enabled: order !== null
  });

  useEffect(() => {
    const getFilesMintedCount = () => {
      if (!firestore) return;
      const q = query(collection(firestore, 'files'), where('state', 'in', ['INSCRIBED']));
      getCountFromServer(q)
        .then((snapshot) => setFilesMinted(snapshot.data().count))
        .catch((error) => {
          console.log('----- Something went wrong with fetching the total number of inscribed WarLogs');
          console.log(error);
        });
    };

    getFilesMintedCount();
  }, []);

  useEffect(() => {
    if (!orderInfo || !orderInfo.charge.address || promptingForCharge || txid !== null) return;

    const promptCharge = async () => {
      if (!order) return;
      setPromptingForCharge(true);
      try {
        const response = await sendBTC(orderInfo.charge.address, order?.amount);
        setTxid(response);
        setStage(ESTAGES.Published);
        toast.success(`Successfully Broadcasted TX: ${response}`);
        // Push the order into firebase for points processing
        if (auth.currentUser) {
          pushDirectOrderToFirebase({
            id: order.id,
            userId: auth.currentUser?.uid,
            source: 'trio.xyz',
            type: OrderType.DIRECT,
            subType: EOrderSubType.SPARTACUS,
            createdAt: Timestamp.now(),
            rewardState: ERewardState.Default
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    promptCharge();
  }, [orderInfo]);

  const progress = useMemo(() => (filesMinted / TOTAL_NUMBER_OF_FILES) * 100, [filesMinted]);

  const renderCustomInput = () => {
    if (showCustomInput) {
      return (
        <Input
          type='number'
          value={fileCount}
          max={100}
          min={1}
          className='h-full bg-ob-purple-dark text-center'
          onChange={(e) => setFileCount(Number(e.target.value))}
        />
      );
    }

    return 'custom';
  };

  const renderButtonForStage = () => {
    let buttonTxt: string = '';
    let buttonAction: () => void = () => {};
    let buttonLoading: boolean = false;
    switch (stage) {
      case ESTAGES.Select: {
        buttonTxt = 'Continue';
        buttonAction = () => setStage(ESTAGES.Pay);
        break;
      }
      case ESTAGES.Pay: {
        buttonTxt = order === null ? 'Publish War Logs' : 'Paying...';
        buttonLoading = orderLoading;
        buttonAction = async () => {
          if (!wallet) return toast.error('Please connect your wallet');
          setOrderLoading(true);
          try {
            const order = await fetch('/api/mint-spartacus', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                receiveAddress: wallet.ordinalsAddress,
                feeRate,
                useLowPostage: USE_LOW_POSTAGE,
                fileCount
              })
            });
            setOrder((await order.json()) as unknown as TSpartacusOrder);
          } catch (error: any) {
            toast.error(error);
          }
          setOrderLoading(false);
        };
        break;
      }
      default:
        break;
    }

    return (
      <Button className='w-full min-w-[66%]' onClick={buttonAction} disabled={buttonLoading || order !== null}>
        {buttonTxt} &nbsp; {buttonLoading && <Loading />}
      </Button>
    );
  };

  return (
    <Section padding={false} paddingLeft={true} className='relative'>
      {ENV !== ENVS.PROD && (
        <div className='absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center bg-ob-black/80'>
          <span className='text-4xl'>
            Spartacus not avaialable on <span className='text-ob-green-light'>{ENV}</span>
          </span>
        </div>
      )}
      <div className='flex flex-col gap-4'>
        <h1>Project Spartacus</h1>
        <div className='flex flex-row gap-2'>
          <Socials config={SOCIALS_CONFIG} />
        </div>
        <span className='max-w-[80%] text-3xl font-thin text-ob-white-40'>
          Stand with Julian Assange by publishing the Afghan War Logs to the Bitcoin Blockchain.
        </span>

        {stage !== ESTAGES.Published && (
          <>
            <div className='flex max-w-[80%] flex-col gap-2 bg-ob-purple-dark p-4'>
              <h4 className='text-2xl text-white'>Mint Quantity</h4>

              <div className='flex w-full flex-col gap-4 rounded-md bg-ob-purple p-4'>
                {stage === ESTAGES.Select && (
                  <div className='flex flex-row justify-between gap-2'>
                    {[1, 5, 10, 25, 50, 100, 'custom'].map((option: string | number, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (typeof option === 'number') {
                              setFileCount(option);
                              setShowCustomInput(false);
                            } else {
                              setFileCount(21);
                              setShowCustomInput(true);
                            }
                          }}
                          className={`flex h-[72px] max-h-[72px] w-[72px] max-w-[72px] items-center justify-center rounded-md border border-ob-purple-lighter capitalize text-white ${fileCount === option ? 'bg-ob-purple-light/[0.80]' : ''} hover:cursor-pointer ${showCustomInput && option === 'custom' ? 'border-2 bg-ob-purple-light/[0.80]' : ''} `}
                        >
                          {typeof option === 'number' ? option : renderCustomInput()}
                        </div>
                      );
                    })}
                  </div>
                )}
                {stage === ESTAGES.Pay && <FeeSelector txVirtualSize={DEFAULT_VIRTUAL_SIZE.txVBytes} />}
                <div className='flex flex-row items-center justify-between gap-2'>
                  {renderButtonForStage()}
                  <Tag label='+ 1000 XP' info='This order receives 1000 XP for upon completion' />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='relative h-[5px] w-full bg-ob-purple-light/[0.80]'>
                    <div className='absolute h-full bg-ob-green-light' style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <span>
                      Total Minted: {filesMinted} / {TOTAL_NUMBER_OF_FILES}
                    </span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
            {stage === ESTAGES.Pay && <SpartacusFeesPanel count={fileCount} order={order} />}
          </>
        )}
        {stage === ESTAGES.Published && (
          <div className='flex flex-col gap-2'>
            <span className='text-2xl'>You minted a War Log.</span>
            <span>Your inscription will arrive in your wallet shortly.</span>

            {txid && <MempoolTx txid={txid} />}
          </div>
        )}
      </div>
    </Section>
  );
}

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ELaunchpadPhaseStatus, EPSBTStatus, ESteps, ILaunchpadPhase } from '@/types/creators';
import { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AuthContext } from '@/app/providers/AuthContext';
import { convertUnixToLocalTimeString } from '@/lib/utilities/convertUnixTImeToLocalTime';
import { satsToBitcoin } from '@/lib/utilities';

const FETCH_INTERVAL = 8000;
let intervalId: number | NodeJS.Timeout;

const TermsAndConditions = ({ setAccepted }: { setAccepted: (accepted: boolean) => void }) => {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = value;
    setChecked(updatedChecked);
    setAccepted(updatedChecked.every((item) => item));
  };

  return (
    <div className='w-full rounded-md bg-ob-purple-dark py-4 text-white'>
      <h2 className='text-lg'>Terms & Conditions</h2>
      <div className='mt-4 flex flex-col gap-3'>
        {[
          'You agree that you have the right to submit this collection and that it does not violate any intellectual property rights.',
          'You agree that the collection does not contain any illegal or NSFW content.',
          'You agree that OrdinalsBot will not be held responsible for any damages caused by the collection and the collection can be removed at any time.'
        ].map((text, index) => (
          <div key={index} className='flex items-center gap-2'>
            <Input
              type='checkbox'
              className='h-fit w-fit accent-white'
              checked={checked[index]}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
            <p className='text-sm text-ob-grey-lightest'>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhaseRow = ({ phase, handleSignPSBTByPhase, signing }: any) => (
  <>
    <div className='grid w-full grid-cols-3 gap-4 xl:grid-cols-7 xl:gap-6'>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>Title</div>
        <div className='mt-2 text-sm text-ob-grey-lighter'>{phase.name}</div>
      </div>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>Price</div>
        <div className='mt-2 text-sm text-ob-grey-lighter'>{satsToBitcoin(phase?.price)} BTC</div>
      </div>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>Start Time</div>
        <div className='mt-2 text-xs text-ob-grey-lighter'>{convertUnixToLocalTimeString(phase?.start_date)}</div>
      </div>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>End Time</div>
        <div className='mt-2 text-xs text-ob-grey-lighter'>{convertUnixToLocalTimeString(phase?.end_date)}</div>
      </div>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>Inscriptions</div>
        <div className='mt-2 text-sm text-ob-grey-lighter'>{phase?.total_inscriptions}</div>
      </div>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>Status</div>
        <div className='mt-2 text-sm text-ob-grey-lighter'>{phase?.status}</div>
      </div>
      <div className='flex h-14 flex-col items-stretch justify-center'>
        <div className='text-sm'>Action</div>
        <Button
          key={phase.id + 'sign-button'}
          disabled={signing === phase.id || phase.status === ELaunchpadPhaseStatus.ACTIVE}
          onClick={() => handleSignPSBTByPhase(phase.id)}
          variant='default'
          className={`mt-1 rounded-md px-2 py-1 font-bold ${phase.status === ELaunchpadPhaseStatus.ACTIVE && 'bg-green-500 disabled:opacity-100'}`}
        >
          {phase.status === ELaunchpadPhaseStatus.ACTIVE ? 'Complete' : signing === phase.id ? 'Signing...' : 'Sign'}
        </Button>
      </div>
    </div>
  </>
);

const PhaseLoader = () => {
  return (
    <div className='grid w-full grid-cols-3 gap-4 xl:grid-cols-7 xl:gap-6'>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
      <div>
        <div className='h-[18px] w-[80px] animate-pulse rounded-md bg-ob-purple-light'></div>
        <div className='mt-1 h-[36px] w-[100px] animate-pulse rounded-md bg-ob-purple-light'></div>
      </div>
    </div>
  );
};

export const SubmitProject = ({
  launchpadId,
  setStep,
  launch
}: {
  launchpadId: string;
  setStep: (step: number) => void;
  launch: () => void;
}) => {
  const { signPsbt } = useContext(AuthContext);
  const [phases, setPhases] = useState<ILaunchpadPhase[] | null>(null);
  const [signing, setSigning] = useState<number | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [signTab, setSignTab] = useState<number>(0);

  const totalInscriptions = useMemo(() => {
    if (phases?.length) {
      const sum = phases.reduce((acc, phase) => acc + phase.total_inscriptions, 0);
      return sum;
    } else {
      return 0;
    }
  }, [phases]);

  const isAvailableSubmit = useMemo(() => {
    if (phases?.length) {
      const pendingPhases = phases.find((p) => p.status === ELaunchpadPhaseStatus.PENDING);
      return pendingPhases ? false : true;
    } else {
      return false;
    }
  }, [phases]);

  const whiteListPhases = useMemo(() => {
    return phases?.filter(({ name, is_public }) => name.toLowerCase().includes('whitelist') && !is_public);
  }, [phases]);

  const publicPhases = useMemo(() => {
    return phases?.filter(({ name, is_public }) => name.toLowerCase().includes('public') && is_public);
  }, [phases]);

  const otherPhases = useMemo(() => {
    return phases?.filter(({ name }) => !name.toLowerCase().includes('whitelist') && !name.toLowerCase().includes('public'));
  }, [phases]);

  const signTabs = useMemo(() => {
    const tabs = [];

    if (whiteListPhases?.length) {
      const pendings = whiteListPhases.find((p) => p.status === ELaunchpadPhaseStatus.PENDING);
      tabs.push({ name: 'Whitelist', status: pendings ? false : true });
    }

    if (publicPhases?.length) {
      const pendings = publicPhases.find((p) => p.status === ELaunchpadPhaseStatus.PENDING);
      tabs.push({ name: 'Public', status: pendings ? false : true });
    }

    if (otherPhases?.length) {
      const pendings = otherPhases.find((p) => p.status === ELaunchpadPhaseStatus.PENDING);
      tabs.push({ name: 'Other', status: pendings ? false : true });
    }

    return tabs;
  }, [whiteListPhases, publicPhases, otherPhases]);

  const isAvailableGoNext = useMemo(() => {
    if (!phases?.length) return false;

    let selectedPhases;
    const currentTabName = signTabs[signTab]?.name;

    switch (currentTabName) {
      case 'Whitelist':
        selectedPhases = whiteListPhases;
        break;
      case 'Public':
        selectedPhases = publicPhases;
        break;
      default:
        selectedPhases = otherPhases;
        break;
    }

    if (!selectedPhases) return false;

    return !selectedPhases.some((phase) => phase.status === ELaunchpadPhaseStatus.PENDING);
  }, [phases, signTab, signTabs, whiteListPhases, publicPhases, otherPhases]);

  const fetchLaunchpadData = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/launchpad/info/${id}`, { method: 'GET' });

      if (!res.ok) {
        const resJson = await res.json();
        throw new Error(resJson?.error || 'Failed to fetch launchpad information.');
      }
      const response = await res.json();
      if (response?.phases?.length) {
        setPhases(response?.phases || []);
      } else {
        clearInterval(intervalId);
      }
    } catch (error) {
      toast.error('Failed to fetch launchpad information.');
    }
  };

  const handleSignPSBTByPhase = async (id: number) => {
    if (!termsAccepted) {
      toast.error('You must agree to all terms and conditions before signing.');
      return;
    }

    setSigning(id);
    try {
      clearInterval(intervalId);

      if (phases) {
        const psbts = phases.find((p) => p.id === id)?.psbts;

        for (const psbt of psbts || []) {
          if (psbt.status === EPSBTStatus.SIGNED) continue;

          const psbtResponse = await fetch(`/api/launchpad/get-psbt/${psbt.id}`);
          if (!psbtResponse.ok) throw new Error(psbtResponse.statusText);

          const psbtData = await psbtResponse.json();
          const signedData = await signPsbt(psbtData.psbt);

          if (!signedData?.signedPsbtBase64) throw new Error('Invalid signed data received.');

          const confirmResponse = await fetch(`/api/launchpad/confirm/${psbtData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signedPsbt: signedData.signedPsbtBase64 })
          });

          if (!confirmResponse.ok) {
            const confirmResponseJson = await confirmResponse.json();
            throw new Error(confirmResponseJson?.error || 'Failed to confirm signed PSBT.');
          }

          toast.success(`PSBT "${psbt.id}" signed and confirmed successfully.`);
        }

        await fetchLaunchpadData(launchpadId);
      }
    } catch (error: any) {
      toast.error(error?.message || 'An unexpected error occurred while signing.');
    } finally {
      setSigning(null);
      intervalId = setInterval(() => fetchLaunchpadData(launchpadId), FETCH_INTERVAL);
    }
  };

  useEffect(() => {
    if (launchpadId) {
      fetchLaunchpadData(launchpadId);
      intervalId = setInterval(() => fetchLaunchpadData(launchpadId), FETCH_INTERVAL);
    }
    return () => clearInterval(intervalId);
  }, [launchpadId]);

  const renderContent = () => {
    if (signTabs[signTab].name == 'Whitelist') {
      return (
        <>
          {whiteListPhases?.map((phase) => {
            return (
              <PhaseRow
                key={phase.id + 'whilteList'}
                phase={phase}
                handleSignPSBTByPhase={handleSignPSBTByPhase}
                signing={signing}
              />
            );
          })}

          {signTabs.length > 1 && (
            <Button onClick={() => setSignTab(1)} disabled={!isAvailableGoNext} className='mx-auto mt-6 rounded-md'>
              Next Group
            </Button>
          )}
        </>
      );
    } else if (signTabs[signTab].name == 'Public') {
      return (
        <>
          {publicPhases?.map((phase) => {
            return (
              <PhaseRow
                key={phase.id + 'Public'}
                phase={phase}
                handleSignPSBTByPhase={handleSignPSBTByPhase}
                signing={signing}
              />
            );
          })}

          {signTabs.length > 2 && (
            <Button onClick={() => setSignTab(2)} disabled={!isAvailableGoNext} className='mx-auto mt-6 rounded-md'>
              Next Group
            </Button>
          )}
        </>
      );
    } else {
      return (
        <>
          {otherPhases?.map((phase) => {
            return (
              <PhaseRow
                key={phase.id + 'ohter'}
                phase={phase}
                handleSignPSBTByPhase={handleSignPSBTByPhase}
                signing={signing}
              />
            );
          })}
        </>
      );
    }
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex w-full flex-col gap-6 rounded-md bg-ob-purple-dark p-8 text-white'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg'>Sign</h2>
          <p className='text-sm text-ob-grey-lightest'>You are here by agreeing to sign {totalInscriptions} inscriptions.</p>
        </div>

        <div className='grid grid-cols-1 gap-2 xl:grid-cols-3'>
          {phases?.length ? (
            phases.map((phase, index) => {
              return (
                <div
                  key={index}
                  className='flex min-h-[7.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-ob-purple text-center text-3xl font-bold'
                >
                  {phase.name}
                  <span className='text-sm font-normal text-ob-grey-lighter'>
                    {satsToBitcoin(phase.price)} BTC ({phase.price} Sats)
                  </span>
                </div>
              );
            })
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => {
                return (
                  <div key={index} className='min-h-[7.5rem] w-full animate-pulse rounded-lg bg-ob-purple-light/60'></div>
                );
              })}
            </>
          )}
        </div>

        <TermsAndConditions setAccepted={setTermsAccepted} />

        <div className='flex w-full'>
          {signTabs?.map((tab, index) => (
            <div
              key={index}
              className={`flex w-full items-center justify-center gap-2 rounded-t-md ${signTab === index ? 'bg-ob-purple-light' : 'bg-ob-purple'} p-4 text-center`}
            >
              {tab.status && (
                <svg width='28' height='29' viewBox='0 0 28 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect y='0.5' width='28' height='28' rx='15' fill='#33FF81' />
                  <path
                    d='M13.9231 20C13.6767 20 13.4451 19.904 13.2705 19.7297L9.27045 15.7296C9.09616 15.5552 9 15.3234 9 15.0769C9 14.8303 9.09616 14.5985 9.27045 14.4242C9.44473 14.2498 9.67669 14.1539 9.92309 14.1539C10.1695 14.1539 10.4015 14.2498 10.5757 14.4241L13.9231 17.7715L19.4244 12.2703C19.5987 12.0959 19.8306 12 20.077 12C20.3234 12 20.5554 12.0959 20.7297 12.2702C20.904 12.4446 21.0001 12.6765 21.0001 12.923C21.0001 13.1696 20.904 13.4014 20.7297 13.5757L14.5758 19.7296C14.4012 19.904 14.1695 20 13.9231 20Z'
                    fill='black'
                  />
                </svg>
              )}
              {tab.name}
            </div>
          ))}
        </div>

        {phases?.length ? renderContent() : <PhaseLoader />}
      </div>

      <div className='mt-16 flex justify-center gap-2'>
        <Button
          onClick={() => setStep(ESteps.PHASE)}
          type='button'
          variant='default'
          className='min-w-52 rounded-md'
          size='lg'
        >
          Previous
        </Button>
        <Button
          onClick={launch}
          type='button'
          disabled={!isAvailableSubmit}
          variant='default'
          className='min-w-52 gap-2 rounded-md'
          size='lg'
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

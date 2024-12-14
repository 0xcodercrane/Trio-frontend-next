import { Container } from '@/components/Container';
import Favorite from '@/components/Favorite';
import NotificationButton from '@/components/Header/NotificationButton';
import Section from '@/components/Section';
import { Tag, Chit, Avatar } from '@/components/common';
import { MempoolTx } from '@/components/common/MempoolTx';
import { Button } from '@/components/ui/button';
import { ENV, ENVS } from '@/lib/constants';
import { ComponentVariantsValues, EComponentVariants } from '@/types';

const sectionGap = 'gap-8';
const itemGap = 'gap-4';
const labelGap = 'gap-2';
export default function Page() {
  return (
    <Section className='bg-ob-purple-dark'>
      <Container padding>
        <div className='flex w-full flex-col bg-ob-purple-dark py-[--section-vertical-padding] pt-[--header-height]'>
          <div className={`flex flex-col ${sectionGap}`}>
            <hr className='border-ob-grey-lighter' />
            {/* Tags */}
            <div className='flex flex-col gap-4'>
              <h3>Tags</h3>
              <div className={`flex flex-row ${itemGap}`}>
                {ComponentVariantsValues.map((variant: EComponentVariants, index: number) => (
                  <div className={`flex flex-col ${labelGap}`} key={index}>
                    <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>{variant}</span>
                    <Tag variant={variant} label='1000' />
                  </div>
                ))}
              </div>
            </div>

            <hr className='border-ob-grey-lighter' />

            {/* Chits */}
            <div className='flex flex-col gap-4'>
              <h3>Chits</h3>
              <div className={`flex flex-row ${itemGap}`}>
                {ComponentVariantsValues.map((variant: EComponentVariants, index: number) => (
                  <div className={`flex flex-col ${labelGap}`} key={index}>
                    <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>{variant}</span>
                    <Chit variant={variant} label={variant.toLowerCase()} />
                  </div>
                ))}
              </div>
            </div>

            <hr className='border-ob-grey-lighter' />

            {/* Buttons */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <h3>Buttons</h3>
                {['sm', 'default', 'lg'].map((size: string, index: number) => {
                  return (
                    <div className='flex flex-col gap-4' key={index}>
                      <h4 className='text-xl font-bold uppercase text-ob-grey-lighter'>{size}</h4>
                      <div className={`flex flex-row ${itemGap}`}>
                        {['default', 'destructive', 'outline', 'secondary'].map((variant: string, index: number) => (
                          <div className={`flex flex-col ${labelGap}`} key={index}>
                            <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>{variant}</span>
                            <Button
                              size={size as 'default' | 'sm' | 'lg' | 'icon' | null | undefined}
                              variant={
                                variant as
                                  | 'default'
                                  | 'secondary'
                                  | 'destructive'
                                  | 'outline'
                                  | 'ghost'
                                  | 'link'
                                  | undefined
                                  | null
                              }
                            >
                              {variant.toLowerCase()}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr className='border-ob-grey-lighter' />
            {/* Icons */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <h3>Icons</h3>
                <div className={`flex flex-row ${itemGap}`}>
                  <Favorite />
                  <NotificationButton />
                  <Avatar />
                </div>
              </div>
            </div>
            <hr className='border-ob-grey-lighter' />
            {/* MempoolTx */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <h3>Icons</h3>
                <MempoolTx
                  txid={
                    [ENVS.PROD, ENVS.DEV].includes(ENV) // Dev and Prod use Mainnet
                      ? '96624c05a77328292faf374e7fc21a65182cdc8210fc528caec0d9b106ec5c6b'
                      : ENV === ENVS.SIGNET // Provide a different txid for Signet
                        ? 'f1b09ed7ad93674959edecc67e1db071f0815fc91a5a7fc6676d29db144b05db'
                        : ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

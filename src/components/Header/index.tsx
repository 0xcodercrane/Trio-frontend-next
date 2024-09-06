'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { useContext } from 'react';
import ConnectWallet from './ConnectWallet';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import NavBar from '../NavBar';
import ConnectedWallet from './ConnectedWallet';
import { GlobalContext } from '@/app/providers/GlobalContext';

export default function Header() {
  const { loading } = useContext(AuthContext);
  const { menuDisclosure, menuBG } = useContext(GlobalContext);

  return (
    <header
      className={`relative z-20 -mb-24 flex h-[--header-height] w-full flex-row items-center justify-center ${menuBG} px-4 md:px-16 2xl:px-0`}
    >
      <div className='flex w-full max-w-[--global-max-width] items-center justify-between'>
        <div className='z-10 flex w-[33%] justify-start'>
          <div className='ml-2 min-w-[100px] md:ml-0 md:max-w-[200px]'>
            <Link href='/'>
              <Image
                className='h-[--header-content-height]'
                src='/img/trio-logo.svg'
                alt={`${APP_NAME} logo`}
                width={172}
                height={172}
              />
            </Link>
          </div>
        </div>

        <div className='hidden w-[33%] md:flex'>{!menuDisclosure.isOpen && <NavBar />}</div>

        <div className='z-10 w-[33%]'>
          <div className='flex w-full items-center justify-end'>
            {!loading && !auth.currentUser && <ConnectWallet />}
            {auth.currentUser && <ConnectedWallet />}
            {/* <Link href='/#buy-trio'><Button className='w-[80px] h-[48px] p-[0.5rem] md:px-8 md:w-auto rounded-full ml-2 border-2 border-solid border-white font-extrabold' variant='secondary'>Buy TRIO</Button></Link> */}
            <div className='ml-2 flex h-[48px] items-center justify-center md:hidden'>
              {/* { !showMobileMenu && <Menu className='bg-white text-black rounded-full w-[48px] h-full p-[0.75rem] ml-2' onClick={() => setShowMobileMenu(true)} />}
              { showMobileMenu && <X className='bg-white text-black rounded-full w-[48px] h-full p-[0.75rem] ml-2' onClick={() => setShowMobileMenu(false)} />} */}
            </div>
          </div>
        </div>
        {/* {showMobileMenu && <div className='w-full h-[100vh] absolute top-[96px] right-0 bg-ob-black-lighter pt-32 z-20'><NavBar /></div>} */}
        {/* { showWalletConnectModal && <ConnectWalletModal closeModal={() => setShowWalletConnectModal(false)} />} */}
      </div>
    </header>
  );
}

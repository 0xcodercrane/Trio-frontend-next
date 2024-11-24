'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { useContext } from 'react';
import ConnectWallet from './ConnectWallet';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../NavBar';
import ConnectedWallet from './ConnectedWallet';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { Container } from '../Container';

export default function Header() {
  const { loading, isAuthenticated } = useContext(AuthContext);
  const { menuDisclosure, menuBG } = useContext(GlobalContext);

  return (
    <header
      className={`relative z-20 flex h-[--header-height] max-h-[--header-height] w-full items-center ${menuBG} -mb-24`}
    >
      <Container padding>
        <div className='grid w-full grid-cols-[1fr_1.5fr_1fr] items-center'>
          <div className='flex h-full items-center'>
            <Link href='/'>
              <Image
                className='w-aut h-[--header-content-height]'
                src='/img/trio-logo.svg'
                alt={`${APP_NAME} logo`}
                width={95}
                height={30}
              />
            </Link>
          </div>

          <div className='hidden items-center justify-center space-x-4 lg:flex'>{!menuDisclosure.isOpen && <NavBar />}</div>

          {/* FIXME show mobile menu and hide these components - this will fix the shrinking icons as well */}
          <div className='col-span-2 flex items-center justify-end space-x-4 lg:col-span-1'>
            {!loading && !isAuthenticated ? <ConnectWallet /> : <ConnectedWallet />}
            {/* <Link href='/#buy-trio'><Button className='w-[80px] h-[48px] p-[0.5rem] md:px-8 md:w-auto rounded-full ml-2 border-2 border-solid border-white font-extrabold' variant='secondary'>Buy TRIO</Button></Link> */}
            {/* { !showMobileMenu && <Menu className='bg-white text-black rounded-full w-[48px] h-full p-[0.75rem] ml-2' onClick={() => setShowMobileMenu(true)} />}
            { showMobileMenu && <X className='bg-white text-black rounded-full w-[48px] h-full p-[0.75rem] ml-2' onClick={() => setShowMobileMenu(false)} />} */}
            {/* {showMobileMenu && <div className='w-full h-[100vh] absolute top-[96px] right-0 bg-ob-purple-dark pt-32 z-20'><NavBar /></div>} */}
            {/* { showWalletConnectModal && <ConnectWalletModal closeModal={() => setShowWalletConnectModal(false)} />} */}
          </div>
        </div>
      </Container>
    </header>
  );
}

'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { useContext } from 'react';
import ConnectWallet from './ConnectWallet';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../NavBar';
import ConnectedWallet from './ConnectedWallet';
import { Container } from '../Container';
import { Searchbar } from '../Searchbar';

interface HeaderProps {
  renderSearchbar?: boolean;
  onChangeSearch?: (searchKeyword: string) => void;
}

export default function Header({ renderSearchbar = false, onChangeSearch }: HeaderProps) {
  const { loading, isAuthenticated } = useContext(AuthContext);

  return (
    <header className='relative z-20 -mb-24 flex h-[--header-height] max-h-[--header-height] w-full items-center'>
      <Container padding>
        <div className='grid w-full grid-cols-[1fr_1.5fr_1fr] items-center'>
          <div className='flex h-full items-center'>
            <Link href='/' className='flex items-center'>
              <Image
                className='w-aut h-[--header-content-height]'
                src='/img/trio-logo.svg'
                alt={`${APP_NAME} logo`}
                width={95}
                height={30}
              />
              <span className='me-2 -translate-y-2 translate-x-3 rounded bg-gray-700 px-2.5 py-0.5 text-xs font-bold text-gray-300'>
                Alpha
              </span>
            </Link>
          </div>

          <div className='hidden items-center justify-center space-x-4 lg:flex'>
            {renderSearchbar && onChangeSearch ? (
              <Searchbar
                focusOnRender
                onChange={onChangeSearch}
                className='flex min-w-[320px] items-center justify-between gap-4 rounded-full bg-[#646464]/[.14] has-[:focus]:bg-[#646464]/[.25]'
              />
            ) : (
              <NavBar />
            )}
          </div>

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

'use client';

import { useContext, useState } from 'react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { EMenuType } from '@/types/global-context.types';
import ProfilePane from './ProfilePane';
import ActivityPane from './ActivityPane';
import WalletConnectionPane from './WalletConnectionPane';
import { Container } from '@/components/Container';
import SearchPane from './SearchPane';
import Header from '../Header';

export default function MenuPanes() {
  const { menuDisclosure, menuType, menuBG } = useContext(GlobalContext);
  const { isOpen } = menuDisclosure;

  const [searchKeyword, setSearchKeyword] = useState('');

  if (!isOpen) return null;

  const renderPane = () => {
    switch (menuType) {
      case EMenuType.PROFILE:
        return <ProfilePane />;
      case EMenuType.ACTIVITY:
        return <ActivityPane />;
      case EMenuType.WALLET:
        return <WalletConnectionPane />;
      case EMenuType.SEARCH:
        return <SearchPane searchKeyword={searchKeyword} />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 left-0 top-0 ${menuBG} z-50 text-white`}>
      {menuType === EMenuType.SEARCH ? <Header renderSearchbar onChangeSearch={setSearchKeyword} /> : <Header />}
      {/* <div className='fixed left-0 top-0 z-50 flex h-[--header-height] w-full items-center justify-between bg-ob-purple-darkest'>
        <Container padding>
          <div className='flex flex-row justify-between'>
            <div className='flex items-center'>
              <Link href='/'>
                <Image className='h-10 w-auto' src='/img/trio-logo.svg' alt='Trio logo' width={100} height={40} />
              </Link>
            </div>

            <div>
              <X
                className='h-auto max-h-[--button-height-md] w-full max-w-[--button-height-md] cursor-pointer rounded-full bg-white p-[0.75rem] text-black'
                onClick={menuDisclosure.close}
              />
            </div>
          </div>
        </Container>
      </div> */}

      <div className='absolute inset-0 top-[--header-height] z-40 overflow-y-auto bg-ob-purple-darkest'>
        <Container justify={menuType === EMenuType.WALLET ? 'center' : 'start'} direction='col' padding>
          <div className='flex h-full w-full flex-col justify-start'>{renderPane()}</div>
        </Container>
      </div>
    </div>
  );
}

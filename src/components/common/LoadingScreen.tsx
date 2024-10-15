import Loading from './Loading';

export default function LoadingScreen() {
  return (
    <div className='max-w-screen items center flex h-full max-h-screen min-h-[80vh] w-full flex-col justify-center bg-ob-black/[0.90]'>
      <Loading />
    </div>
  );
}

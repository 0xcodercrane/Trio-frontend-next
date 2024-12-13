import { Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => (
  <CopyToClipboard onCopy={(_, result) => result && toast.success('Content successfully copied to clipboard.')} text={text}>
    <Button variant='secondary' size='icon-xs' className='p-1'>
      <Copy />
    </Button>
  </CopyToClipboard>
);

export { CopyButton };

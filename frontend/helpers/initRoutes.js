import SendBoxRouter from '../routes/SendBox';
import IndexRouter from '../routes/Index';

export default function () {
  return {
    sendBox: new SendBoxRouter(),
    index:   new IndexRouter(),
  };
}

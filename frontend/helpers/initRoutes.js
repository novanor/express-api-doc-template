import SendBoxRouter from '../routes/SendBoxRouter';
import IndexRouter from '../routes/IndexRouter';

export default function () {
  return {
    sendBox: new SendBoxRouter(),
    index: new IndexRouter(),
  };
}

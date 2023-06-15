import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin fill-stone-100" />
    </div>
  );
}
export default Loader;

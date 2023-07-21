import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Props {
  width?: string;
  height?: string;
  theme?: 'black' | 'white';
}

const Loader = ({
  width = '20px',
  height = '20px',
  theme = 'white',
}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <AiOutlineLoading3Quarters
        className={`w-[${width}] h-[${height}] animate-spin ${
          theme === 'white' ? 'fill-stone-100' : 'fill-gray-900'
        }`}
      />
    </div>
  );
};
export default Loader;

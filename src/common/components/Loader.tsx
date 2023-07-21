import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Props {
  size?: number;
  theme?: 'black' | 'white';
}

const Loader = ({ size = 20, theme = 'white' }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <AiOutlineLoading3Quarters
        size={size}
        className={`animate-spin ${
          theme === 'white' ? 'fill-stone-100' : 'fill-gray-900'
        }`}
      />
    </div>
  );
};
export default Loader;

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = ({color}) => {
  return (
    <AiOutlineLoading3Quarters
      className={`animate-spin ${color ? color : "text-blue-500"}  text-3xl`}
    />
  );
};

export default Loader;

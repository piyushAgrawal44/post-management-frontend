import Loader from "./Loader";

const Button = ({ onClick, loading, text, color = "bg-blue-500", type = "button" }) => {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className={`w-full ${color} text-white py-2 rounded-md hover:bg-${color}-600 transition flex justify-center items-center gap-2 disabled:opacity-60`}
    >
      {loading ? <Loader color="text-white" /> : text}
    </button>
  );
};

export default Button;

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeaderBack = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className="relative h-15 bg-[#f9f5ff] flex items-center justify-center ">
      <div
        className="flex items-center justify-center absolute left-5 bg-white rounded-full p-2"
        onClick={backToHome}
      >
        <ArrowLeft className="text-[#4a2c5d]" />
      </div>
    </div>
  );
};

export default HeaderBack;

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div className="min-h-25 px-4 py-2.5 mt-3">
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <img src="./images/banner.jpg" alt="" />
        <div className=" flex items-center absolute bottom-5 right-5">
          <Button className="rounded-full font-bold bg-[#aee2ff] text-[#4a2c5d] text-[12px]">
            Gọi món
            <span>
              <ArrowRight className="text-[12px]" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

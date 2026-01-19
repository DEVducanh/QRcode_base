const Header = () => {
    return (
        <div className="relative h-18 bg-[#f9f5ff] flex items-center justify-center ">
            <img src={"./images/logo.svg"} alt="Logo" width={63} height={63} className="absolute left-1/2 -translate-x-1/2 w-16 h-16" />
            <div className="flex items-center justify-center gap-3 absolute right-5">
                <span className="cursor-pointer">
                    <img src={"./icons/cart_icon.svg"} alt="Cart" width={63} height={63} className="w-[22px] h-[22px]" />
                </span>
                <span className="cursor-pointer">
                    <img src={"./icons/user_icon.svg"} alt="User" width={63} height={63} className="w-[22px] h-[22px]" />
                </span>
            </div>
        </div>
    )
}

export default Header
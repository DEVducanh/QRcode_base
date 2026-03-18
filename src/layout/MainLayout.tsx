import { message } from "antd";
import { MessageContext } from "../lib/messageContext";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage({
    top: 50,
    duration: 1.5,
  });
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {isAdmin ? (
        <>{children}</>
      ) : (
        <div className="max-w-110 min-h-screen mx-auto">{children}</div>
      )}
    </MessageContext.Provider>
  );
};

export default MainLayout;

import { message } from "antd";
import { MessageContext } from "../lib/messageContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage({
    top: 50,
    duration: 1.5,
  });
  return (
    <MessageContext.Provider value={messageApi}>
      <div className="max-w-110 min-h-screen mx-auto">
        {contextHolder}
        {children}
      </div>
    </MessageContext.Provider>
  );
};

export default MainLayout;

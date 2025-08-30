import { ChatLayout } from "@/modules/chat/ui/layouts/chat-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <ChatLayout>{children}</ChatLayout>;
};

export default Layout;

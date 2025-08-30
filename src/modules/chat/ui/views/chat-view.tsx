import { ChatSection } from "@/modules/chat/ui/sections/chat-section";

export const ChatView = () => {
  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <ChatSection />
    </div>
  );
};

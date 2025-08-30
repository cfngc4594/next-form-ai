interface ChatLayoutProps {
  children: React.ReactNode;
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex w-full flex-grow overflow-hidden">{children}</main>
    </div>
  );
};

import { Button } from "@/components/ui/button";

interface FormLayoutCardProps {
  title: string;
  children: React.ReactNode;
  onApply: () => void;
}

export const FormLayoutCard = ({
  title,
  children,
  onApply,
}: FormLayoutCardProps) => {
  return (
    <div className="item-start group flex w-[150px] flex-col gap-2 overflow-hidden">
      <div className="relative">
        <div className="h-[100px] w-[150px] flex-none rounded-md border bg-muted p-1.5 transition-opacity group-hover:opacity-60">
          {children}
        </div>
        <Button
          size="sm"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onApply}
        >
          应用
        </Button>
      </div>
      <div className="truncate text-sm font-medium">{title}</div>
    </div>
  );
};

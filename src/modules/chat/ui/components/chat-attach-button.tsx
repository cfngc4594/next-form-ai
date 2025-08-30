import { PromptInputButton } from "@/components/ai-elements/prompt-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CameraIcon,
  FileIcon,
  ImageIcon,
  PaperclipIcon,
  ScreenShareIcon,
} from "lucide-react";

interface ChatAttachButtonProps {
  onAction: (action: string) => void;
}

export const ChatAttachButton = ({ onAction }: ChatAttachButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <PromptInputButton
          className="!rounded-full border font-medium"
          variant="outline"
        >
          <PaperclipIcon size={16} />
          <span>Attach</span>
        </PromptInputButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onAction("upload-file")}>
          <FileIcon className="mr-2" size={16} />
          Upload file
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("upload-photo")}>
          <ImageIcon className="mr-2" size={16} />
          Upload photo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("take-screenshot")}>
          <ScreenShareIcon className="mr-2" size={16} />
          Take screenshot
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("take-photo")}>
          <CameraIcon className="mr-2" size={16} />
          Take photo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

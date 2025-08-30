import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  BarChartIcon,
  BoxIcon,
  CodeSquareIcon,
  GraduationCapIcon,
  NotepadTextIcon,
} from "lucide-react";

const suggestions = [
  { icon: BarChartIcon, text: "Analyze data", color: "#76d0eb" },
  { icon: BoxIcon, text: "Surprise me", color: "#76d0eb" },
  { icon: NotepadTextIcon, text: "Summarize text", color: "#ea8444" },
  { icon: CodeSquareIcon, text: "Code", color: "#6c71ff" },
  { icon: GraduationCapIcon, text: "Get advice", color: "#76d0eb" },
  { icon: null, text: "More" },
];

interface ChatSuggestionsProps {
  onClick: (suggestion: string) => void;
}

export const ChatSuggestions = ({ onClick }: ChatSuggestionsProps) => {
  return (
    <Suggestions className="px-4">
      {suggestions.map(({ icon: Icon, text, color }) => (
        <Suggestion
          className="font-normal"
          key={text}
          onClick={() => onClick(text)}
          suggestion={text}
        >
          {Icon && <Icon size={16} style={{ color }} />}
          {text}
        </Suggestion>
      ))}
    </Suggestions>
  );
};

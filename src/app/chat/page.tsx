"use client";

import { Branch, BranchMessages } from "@/components/ai-elements/branch";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Response } from "@/components/ai-elements/response";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { FormDisplay, isValidFormOutput } from "@/components/form-display";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import {
  AudioWaveformIcon,
  BarChartIcon,
  BoxIcon,
  CameraIcon,
  CodeSquareIcon,
  FileIcon,
  GlobeIcon,
  GraduationCapIcon,
  ImageIcon,
  NotepadTextIcon,
  PaperclipIcon,
  ScreenShareIcon,
} from "lucide-react";
import { useState } from "react";

const suggestions = [
  { icon: BarChartIcon, text: "Analyze data", color: "#76d0eb" },
  { icon: BoxIcon, text: "Surprise me", color: "#76d0eb" },
  { icon: NotepadTextIcon, text: "Summarize text", color: "#ea8444" },
  { icon: CodeSquareIcon, text: "Code", color: "#6c71ff" },
  { icon: GraduationCapIcon, text: "Get advice", color: "#76d0eb" },
  { icon: null, text: "More" },
];

const Page = () => {
  const { messages, sendMessage } = useChat();

  const [text, setText] = useState<string>("");
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const [useMicrophone, setUseMicrophone] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage({ text });
      setText("");
    }
  };

  const handleFileAction = (action: string) => {
    console.log("File action:", action);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
  };

  return (
    <div className="relative flex h-screen flex-col divide-y overflow-hidden">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Branch defaultBranch={0} key={message.id}>
              <BranchMessages>
                <Message from={message.role} key={message.id}>
                  <div>
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <MessageContent
                              key={index}
                              className={cn(
                                "group-[.is-user]:rounded-[24px] group-[.is-user]:bg-secondary group-[.is-user]:text-foreground",
                                "group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-assistant]:text-foreground",
                              )}
                            >
                              <Response>{part.text}</Response>
                            </MessageContent>
                          );
                        case "reasoning":
                          return (
                            <Reasoning key={index}>
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        case "tool-generateForm":
                          const constructValidOutput = {
                            jsonSchema: {},
                            uiSchema: {},
                            formData: {},
                            ...(part.input || {}),
                          };
                          return (
                            <Tool key={index} defaultOpen>
                              <ToolHeader type={part.type} state={part.state} />
                              <ToolContent>
                                <ToolInput input={part.input} />
                                <ToolOutput
                                  errorText={part.errorText}
                                  output={
                                    isValidFormOutput(constructValidOutput) ? (
                                      <FormDisplay
                                        data={constructValidOutput}
                                      />
                                    ) : null
                                  }
                                />
                              </ToolContent>
                            </Tool>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                </Message>
              </BranchMessages>
            </Branch>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="grid shrink-0 gap-4 p-4">
        <PromptInput
          className="divide-y-0 rounded-[28px]"
          onSubmit={handleSubmit}
        >
          <PromptInputTextarea
            className="px-5 md:text-base"
            onChange={(event) => setText(event.target.value)}
            placeholder="Ask anything"
            value={text}
          />
          <PromptInputToolbar className="p-2.5">
            <PromptInputTools>
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
                  <DropdownMenuItem
                    onClick={() => handleFileAction("upload-file")}
                  >
                    <FileIcon className="mr-2" size={16} />
                    Upload file
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFileAction("upload-photo")}
                  >
                    <ImageIcon className="mr-2" size={16} />
                    Upload photo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFileAction("take-screenshot")}
                  >
                    <ScreenShareIcon className="mr-2" size={16} />
                    Take screenshot
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFileAction("take-photo")}
                  >
                    <CameraIcon className="mr-2" size={16} />
                    Take photo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <PromptInputButton
                className="rounded-full border font-medium"
                onClick={() => setUseWebSearch(!useWebSearch)}
                variant="outline"
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputButton
              className="rounded-full font-medium text-foreground"
              onClick={() => setUseMicrophone(!useMicrophone)}
              variant="secondary"
            >
              <AudioWaveformIcon size={16} />
              <span>Voice</span>
            </PromptInputButton>
          </PromptInputToolbar>
        </PromptInput>
        <Suggestions className="px-4">
          {suggestions.map(({ icon: Icon, text, color }) => (
            <Suggestion
              className="font-normal"
              key={text}
              onClick={() => handleSuggestionClick(text)}
              suggestion={text}
            >
              {Icon && <Icon size={16} style={{ color }} />}
              {text}
            </Suggestion>
          ))}
        </Suggestions>
      </div>
    </div>
  );
};

export default Page;

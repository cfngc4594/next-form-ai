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
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { FormDisplay, isValidFormOutput } from "@/components/form-display";
import { cn } from "@/lib/utils";
import { ChatAttachButton } from "@/modules/chat/ui/components/chat-attach-button";
import { ChatSuggestions } from "@/modules/chat/ui/components/chat-suggestions";
import { useChat } from "@ai-sdk/react";
import { AudioWaveformIcon, GlobeIcon } from "lucide-react";
import { useState } from "react";

export const ChatSection = () => {
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
    <>
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
                                "group-[.is-assistant]:bg-transparent group-[.is-assistant]:p-0 group-[.is-assistant]:text-foreground"
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
                          return (
                            <Tool key={index} defaultOpen>
                              <ToolHeader type={part.type} state={part.state} />
                              <ToolContent>
                                <ToolInput input={part.input} />
                                <ToolOutput
                                  errorText={part.errorText}
                                  output={
                                    isValidFormOutput(part.output) ? (
                                      <FormDisplay
                                        data={part.output}
                                        onFormSubmit={(formData) => {
                                          const submissionPrompt =
                                            "The user has submitted a form with the following data. " +
                                            "Analyze the data and our conversation history, then call the most appropriate tool to proceed.\n\n" +
                                            "Submitted Data:\n" +
                                            "```json\n" +
                                            JSON.stringify(formData, null, 2) +
                                            "\n```";

                                          sendMessage({
                                            text: submissionPrompt,
                                          });
                                        }}
                                      />
                                    ) : null
                                  }
                                />
                              </ToolContent>
                            </Tool>
                          );
                        case "tool-bookFlight":
                          return (
                            <Tool defaultOpen>
                              <ToolHeader type={part.type} state={part.state} />
                              <ToolContent>
                                <ToolInput input={part.input} />
                                <ToolOutput
                                  errorText="Error"
                                  output={JSON.stringify(part.output, null, 2)}
                                />
                              </ToolContent>
                            </Tool>
                          );
                        case "tool-bookHotel":
                          return (
                            <Tool defaultOpen>
                              <ToolHeader type={part.type} state={part.state} />
                              <ToolContent>
                                <ToolInput input={part.input} />
                                <ToolOutput
                                  errorText="Error"
                                  output={JSON.stringify(part.output, null, 2)}
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
              <ChatAttachButton onAction={handleFileAction} />
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
        <ChatSuggestions onClick={handleSuggestionClick} />
      </div>
    </>
  );
};

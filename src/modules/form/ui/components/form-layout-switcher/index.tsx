"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formDefaultLayoutConfig,
  formSplitEditorLayoutConfig,
  formThreeColumnLayoutConfig,
} from "@/modules/form/constants";
import { useFormFlexLayoutStore } from "@/modules/form/stores/form-flexlayout-store";
import { FormLayoutCard } from "@/modules/form/ui/components/form-layout-switcher/form-layout-card";
import { LayoutDashboardIcon } from "lucide-react";

const FormDefaultLayoutPreview = () => (
  <div className="flex h-full w-full flex-row gap-1.5">
    <div className="flex h-full flex-1 flex-col gap-1.5">
      <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
      <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
      <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
    </div>
    <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
  </div>
);

const FormThreeColumnLayoutPreview = () => (
  <div className="flex h-full w-full flex-row gap-1.5">
    <div className="h-full w-full flex-1 rounded-sm bg-muted-foreground/20" />
    <div className="flex h-full w-full flex-1 flex-col gap-1.5">
      <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
      <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
    </div>
    <div className="h-full w-full flex-1 rounded-sm bg-muted-foreground/20" />
  </div>
);

const FormSplitEditorLayoutPreview = () => (
  <div className="flex h-full w-full flex-row gap-1.5">
    <div className="flex h-full flex-1 flex-col gap-1.5">
      <div className="h-full w-full flex-1 rounded-sm bg-muted-foreground/20" />
      <div className="flex h-full w-full flex-1 gap-1.5">
        <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
        <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
      </div>
    </div>
    <div className="h-full flex-1 rounded-sm bg-muted-foreground/20" />
  </div>
);

export const FormLayoutSwitcher = () => {
  const { setJsonModel: applyLayout } = useFormFlexLayoutStore();

  const formLayoutOptions = [
    {
      name: "default",
      title: "默认布局",
      config: formDefaultLayoutConfig,
      preview: <FormDefaultLayoutPreview />,
    },
    {
      name: "three-column",
      title: "三栏布局",
      config: formThreeColumnLayoutConfig,
      preview: <FormThreeColumnLayoutPreview />,
    },
    {
      name: "split-editor",
      title: "主次布局",
      config: formSplitEditorLayoutConfig,
      preview: <FormSplitEditorLayoutPreview />,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 cursor-pointer"
          aria-label="更换布局"
        >
          <LayoutDashboardIcon size={16} aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px]">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold">布局</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {formLayoutOptions.map((option) => (
              <FormLayoutCard
                key={option.name}
                title={option.title}
                onApply={() => applyLayout(option.config)}
              >
                {option.preview}
              </FormLayoutCard>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { FlexLayout } from "@/components/flexlayout";
import { useFormFlexLayoutStore } from "@/modules/form/stores/form-flexlayout-store";
import { FormData } from "@/modules/form/ui/components/form-data";
import { FormRenderer } from "@/modules/form/ui/components/form-renderer";
import { JSONSchema } from "@/modules/form/ui/components/json-schema";
import { UISchema } from "@/modules/form/ui/components/ui-schema";
import {
  DatabaseIcon,
  FileTextIcon,
  LayoutIcon,
  SettingsIcon,
  type LucideIcon,
} from "lucide-react";

export const FormSection = () => {
  const { jsonModel, realtimeResize, setJsonModel } = useFormFlexLayoutStore();

  const icons: Record<string, LucideIcon> = {
    jsonSchema: FileTextIcon,
    uiSchema: SettingsIcon,
    formData: DatabaseIcon,
    form: LayoutIcon,
  };

  const components: Record<string, React.ReactNode> = {
    jsonSchema: <JSONSchema />,
    uiSchema: <UISchema />,
    formData: <FormData />,
    form: <FormRenderer />,
  };

  return (
    <FlexLayout
      icons={icons}
      components={components}
      jsonModel={jsonModel}
      setJsonModel={setJsonModel}
      realtimeResize={realtimeResize}
    />
  );
};

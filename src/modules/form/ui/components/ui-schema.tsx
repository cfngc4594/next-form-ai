"use client";

import { Loading } from "@/components/loading";
import { useMonacoTheme } from "@/hooks/use-monaco-theme";
import { useFormFlexLayoutStore } from "@/modules/form/stores/form-flexlayout-store";
import { Editor } from "@monaco-editor/react";

export const UISchema = () => {
  const { uiSchema, setUISchema } = useFormFlexLayoutStore();
  const { theme, isShikiReady } = useMonacoTheme();

  const handleUISchemaChange = (value: string | undefined) => {
    if (!value) return;
    try {
      const parsedSchema = JSON.parse(value);
      setUISchema(parsedSchema);
    } catch (error) {
      console.error("Invalid JSON Schema:", error);
    }
  };

  if (!isShikiReady) {
    return <Loading />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Editor
          theme={theme}
          language="json"
          value={JSON.stringify(uiSchema, null, 2)}
          onChange={handleUISchemaChange}
          loading={<Loading />}
        />
      </div>
    </div>
  );
};

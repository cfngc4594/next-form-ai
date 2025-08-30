"use client";

import { formSubmit } from "@/app/actions";
import { IChangeEvent } from "@rjsf/core";
import Form from "@rjsf/shadcn";
import { type RJSFSchema, type UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useCallback, useState } from "react";

interface FormData {
  [key: string]: unknown;
}

interface FormOutput {
  jsonSchema: RJSFSchema;
  uiSchema: UiSchema;
  formData: FormData;
}

export const isValidFormOutput = (output: unknown): output is FormOutput => {
  if (!output || typeof output !== "object") return false;

  const obj = output as Record<string, unknown>;
  return (
    obj.jsonSchema !== undefined &&
    obj.uiSchema !== undefined &&
    obj.formData !== undefined
  );
};

interface FormDisplayProps {
  data: FormOutput;
}

export const FormDisplay = ({ data }: FormDisplayProps) => {
  const [formData, setFormData] = useState(data.formData || {});

  const onFormDataChange = useCallback(({ formData }: IChangeEvent) => {
    setFormData(formData || {});
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 p-4">
        <Form
          schema={data.jsonSchema}
          uiSchema={data.uiSchema}
          formData={formData}
          validator={validator}
          onChange={onFormDataChange}
          onSubmit={async () => {
            await formSubmit(formData);
          }}
        />
      </div>
    </div>
  );
};

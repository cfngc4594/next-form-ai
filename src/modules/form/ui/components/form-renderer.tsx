"use client";

import { useFormFlexLayoutStore } from "@/modules/form/stores/form-flexlayout-store";
import { IChangeEvent } from "@rjsf/core";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";
import { useCallback } from "react";

export const FormRenderer = () => {
  const { jsonSchema, uiSchema, formData, setFormData } =
    useFormFlexLayoutStore();

  const onFormDataChange = useCallback(
    ({ formData }: IChangeEvent) => {
      setFormData(formData || {});
    },
    [setFormData]
  );

  const onSubmit = useCallback(({ formData }: IChangeEvent) => {
    console.log("Form submitted:", formData);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 p-4">
        <Form
          schema={jsonSchema}
          uiSchema={uiSchema}
          formData={formData}
          validator={validator}
          onChange={onFormDataChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

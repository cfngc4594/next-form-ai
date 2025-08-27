"use client";

import { useFormFlexLayoutStore } from "@/modules/form/stores/form-flexlayout-store";
import { IChangeEvent } from "@rjsf/core";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";
import confetti from "canvas-confetti";
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

    confetti({
      particleCount: 150,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42"],
    });
    confetti({
      particleCount: 150,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42"],
    });
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

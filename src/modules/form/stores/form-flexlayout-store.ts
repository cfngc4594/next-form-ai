import {
  formDefaultFormData,
  formDefaultJSONSchema,
  formDefaultLayoutConfig,
  formDefaultUISchema,
} from "@/modules/form/constants";
import { type IJsonModel } from "@massbug/flexlayout-react";
import { type RJSFSchema, UiSchema } from "@rjsf/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FormData {
  [key: string]: unknown;
}

interface FormFlexLayoutState {
  jsonModel: IJsonModel;
  realtimeResize: boolean;
  jsonSchema: RJSFSchema;
  uiSchema: UiSchema;
  formData: FormData;
}

interface FormFlexLayoutActions {
  setJsonModel: (jsonModel: IJsonModel) => void;
  setRealtimeResize: (realtimeResize: boolean) => void;
  setJSONSchema: (schema: RJSFSchema) => void;
  setUISchema: (uiSchema: UiSchema) => void;
  setFormData: (formData: FormData) => void;
}

export const useFormFlexLayoutStore = create<
  FormFlexLayoutState & FormFlexLayoutActions
>()(
  persist(
    (set) => ({
      jsonModel: formDefaultLayoutConfig,
      realtimeResize: true,
      jsonSchema: formDefaultJSONSchema,
      uiSchema: formDefaultUISchema,
      formData: formDefaultFormData,
      setJsonModel: (jsonModel: IJsonModel) => set({ jsonModel }),
      setRealtimeResize: (realtimeResize: boolean) => set({ realtimeResize }),
      setJSONSchema: (jsonSchema: RJSFSchema) => set({ jsonSchema }),
      setUISchema: (uiSchema: UiSchema) => set({ uiSchema }),
      setFormData: (formData: FormData) => set({ formData }),
    }),
    {
      name: "form-flexlayout-storage",
      storage: createJSONStorage(() => localStorage),
      version: 0,
      partialize: (state) => ({
        jsonModel: state.jsonModel,
        realtimeResize: state.realtimeResize,
        jsonSchema: state.jsonSchema,
        uiSchema: state.uiSchema,
        formData: state.formData,
      }),
    }
  )
);

"use server";

import { confirmCallbackRef } from "@/tools/generate-form-tool";

interface FormData {
  [key: string]: unknown;
}
export const formSubmit = async (formData: FormData) => {
  confirmCallbackRef.value(formData);
  console.log(confirmCallbackRef);
};

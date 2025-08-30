import { tool } from "ai";
import { z } from "zod";

export class GlobalRef<T> {
  private readonly sym: symbol;

  constructor(uniqueName: string) {
    this.sym = Symbol.for(uniqueName);
  }

  get value() {
    return (global as any)[this.sym] as T | undefined;
  }

  set value(value: T) {
    (global as any)[this.sym] = value;
  }
}

export const confirmCallbackRef: GlobalRef<(formData: object) => void> =
  new GlobalRef("confirmCallback");

export const generateFormTool = tool({
  onInputStart: () => {
    // confirmCallback = (_) => {};
  },
  description: `Generate interactive forms for user confirmation.
CRITICAL shadcn-specific rules:
- For ALL string fields: MUST specify "ui:widget": "textarea" (no TextWidget available)
- For boolean fields: Can use "checkbox" (available) or "radio"
- For number/integer fields: Can use "range" widget or leave unspecified for default
- For enum fields: Use "select" or "radio" widgets
- For array multi-select: Use "checkboxes" widget
- Available widgets ONLY: CheckboxWidget, CheckboxesWidget, RadioWidget, RangeWidget, SelectWidget, TextareaWidget

Return ONLY a JSON object: {"jsonSchema": {...}, "uiSchema": {...}, "formData": {...}}`,
  inputSchema: z.object({
    jsonSchema: z.any().describe(`Valid JSON Schema Draft-07 defining:
   - Data structure and types (object, string, number, boolean, array)
   - Validation rules (required, minimum, maximum, pattern, format)
   - Field titles and descriptions
   - Default values and enums
   - Example: {"type": "object", "properties": {"age": {"type": "number", "minimum": 0}}}`),
    uiSchema: z.any()
      .describe(`UI Schema optimized for shadcn theme - ONLY use these supported widgets:
   - For boolean fields: "checkbox" (default) or "radio"
   - For string fields: "textarea" (REQUIRED - no default text widget available)
   - For number/integer fields: "range" or use default (no widget specified)
   - For enum fields: "select" or "radio"
   - For array fields: "checkboxes" (for multi-select)
   - Field ordering: "ui:order"
   - Field behavior: "ui:disabled", "ui:readonly", "ui:autofocus"
   - Help text: "ui:help", "ui:description"
   - Placeholder text: "ui:placeholder"
   - Example: {"name": {"ui:widget": "textarea"}, "age": {"ui:help": "Enter your age"}}`),
    formData: z.object()
      .describe(`Sample data matching the jsonSchema structure:
   - Must conform to the schema's type definitions
   - Should demonstrate realistic field values
   - Include all required fields
   - Example: {"name": "John Doe", "age": 25}`),
  }),
  execute: () => {
    return new Promise((resolve) => {
      confirmCallbackRef.value = resolve;
    });
  },
});

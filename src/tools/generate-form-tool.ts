import { deepseek } from "@ai-sdk/deepseek";
import { generateObject, tool } from "ai";
import { z } from "zod";

export const generateFormTool = tool({
  description:
    "Generate interactive forms for any service or data collection need. Automatically adapts to match available tool schemas when users request services.",
  inputSchema: z.object({
    prompt: z
      .string()
      .describe(
        "User's request describing the type of form they want to generate (e.g., 'contact form', 'survey form', 'registration form')"
      ),
  }),
  execute: async ({ prompt }) => {
    const systemPrompt = `You are a JSON Schema expert specializing in react-jsonschema-form (RJSF) with @rjsf/shadcn theme.  
  
When generating forms, automatically analyze the user's request and reference the schemas of relevant available tools to create appropriate form fields. Match the form fields to the tool's inputSchema requirements for seamless integration.  
  
For example:  
- Flight booking requests should generate forms matching flight booking tool schemas (from, to, date)  
- Hotel booking requests should generate forms matching hotel booking tool schemas (city, checkInDate, checkOutDate, guests)  
- Any other service requests should match their corresponding tool schemas  
  
Generate a complete form configuration optimized for shadcn components:  
  
1. **jsonSchema**: Valid JSON Schema Draft-07 defining:  
   - Data structure and types (object, string, number, boolean, array)  
   - Validation rules (required, minimum, maximum, pattern, format)  
   - Field titles and descriptions      
   - Default values and enums      
   - Example: {"type": "object", "properties": {"age": {"type": "number", "minimum": 0}}}      
    
2. **uiSchema**: UI Schema optimized for shadcn theme - ONLY use these supported widgets:      
   - For boolean fields: "checkbox" (default) or "radio"    
   - For string fields: "textarea" (REQUIRED - no default text widget available)    
   - For number/integer fields: "range" or use default (no widget specified)    
   - For enum fields: "select" or "radio"     
   - For array fields: "checkboxes" (for multi-select)    
   - Field ordering: "ui:order"      
   - Field behavior: "ui:disabled", "ui:readonly", "ui:autofocus"      
   - Help text: "ui:help", "ui:description"      
   - Placeholder text: "ui:placeholder"      
   - Example: {"name": {"ui:widget": "textarea"}, "age": {"ui:help": "Enter your age"}}    
    
3. **formData**: Sample data matching the jsonSchema structure:      
   - Must conform to the schema's type definitions      
   - Should demonstrate realistic field values      
   - Include all required fields      
   - Example: {"name": "John Doe", "age": 25}      
    
CRITICAL shadcn-specific rules:      
    - For ALL string fields: MUST specify "ui:widget": "textarea" (no TextWidget available)    
    - For boolean fields: Can use "checkbox" (available) or "radio"      
    - For number/integer fields: Can use "range" widget or leave unspecified for default    
    - For enum fields: Use "select" or "radio" widgets    
    - For array multi-select: Use "checkboxes" widget    
    - Available widgets ONLY: CheckboxWidget, CheckboxesWidget, RadioWidget, RangeWidget, SelectWidget, TextareaWidget    
    
Return ONLY a JSON object: {"jsonSchema": {...}, "uiSchema": {...}, "formData": {...}}`;

    const { object } = await generateObject({
      model: deepseek("deepseek-chat"),
      output: "no-schema",
      system: systemPrompt,
      prompt: prompt,
    });

    return object;
  },
});

import { type IJsonModel } from "@massbug/flexlayout-react";
import { type RJSFSchema, UiSchema } from "@rjsf/utils";

export const formDefaultJSONSchema: RJSFSchema = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Chuck",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    age: {
      type: "integer",
      title: "Age",
    },
    bio: {
      type: "string",
      title: "Bio",
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3,
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
  },
};

export const formDefaultUISchema: UiSchema = {
  firstName: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:placeholder":
      "ui:emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).",
  },
  lastName: {
    "ui:autocomplete": "given-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
  },
  age: {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earth year)",
  },
  bio: {
    "ui:widget": "textarea",
  },
  password: {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!",
  },
  telephone: {
    "ui:options": {
      inputType: "tel",
    },
  },
};

interface FormData {
  [key: string]: unknown;
}

export const formDefaultFormData: FormData = {
  firstName: "Chuck",
  lastName: "Norris",
  age: 75,
  bio: "Roundhouse kicking asses since 1940",
  password: "noneed",
  telephone: "1-800-KICKASS",
};

export const formDefaultLayoutConfig: IJsonModel = {
  global: { tabSetMinWidth: 36, tabSetMinHeight: 36, tabEnableRename: false },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            weight: 33,
            children: [
              {
                type: "tab",
                id: "jsonSchema",
                name: "JSONSchema",
                component: "jsonSchema",
                enableClose: false,
              },
            ],
          },
          {
            type: "tabset",
            weight: 33,
            children: [
              {
                type: "tab",
                id: "uiSchema",
                name: "UISchema",
                component: "uiSchema",
                enableClose: false,
              },
            ],
          },
          {
            type: "tabset",
            weight: 33,
            children: [
              {
                type: "tab",
                id: "formData",
                name: "FormData",
                component: "formData",
                enableClose: false,
              },
            ],
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            id: "form",
            name: "Form",
            component: "form",
            enableClose: false,
          },
        ],
      },
    ],
  },
};

export const formThreeColumnLayoutConfig: IJsonModel = {
  global: {
    tabSetMinWidth: 36,
    tabSetMinHeight: 36,
    tabEnableRename: false,
  },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            weight: 100,
            children: [
              {
                type: "tab",
                id: "jsonSchema",
                name: "JSONSchema",
                component: "jsonSchema",
                enableClose: false,
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                id: "uiSchema",
                name: "UISchema",
                component: "uiSchema",
                enableClose: false,
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                id: "formData",
                name: "FormData",
                component: "formData",
                enableClose: false,
              },
            ],
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            id: "form",
            name: "Form",
            component: "form",
            enableClose: false,
          },
        ],
      },
    ],
  },
};

export const formSplitEditorLayoutConfig: IJsonModel = {
  global: {
    tabSetMinWidth: 36,
    tabSetMinHeight: 36,
    tabEnableRename: false,
  },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "row",
        weight: 50,
        children: [
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                id: "jsonSchema",
                name: "JSONSchema",
                component: "jsonSchema",
                enableClose: false,
              },
            ],
          },
          {
            type: "row",
            weight: 50,
            children: [
              {
                type: "tabset",
                weight: 50,
                children: [
                  {
                    type: "tab",
                    id: "uiSchema",
                    name: "UISchema",
                    component: "uiSchema",
                    enableClose: false,
                  },
                ],
              },
              {
                type: "tabset",
                weight: 50,
                children: [
                  {
                    type: "tab",
                    id: "formData",
                    name: "FormData",
                    component: "formData",
                    enableClose: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            id: "form",
            name: "Form",
            component: "form",
            enableClose: false,
          },
        ],
      },
    ],
  },
};

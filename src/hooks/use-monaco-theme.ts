import {
  DEFAULT_MONACO_DARK_THEME,
  DEFAULT_MONACO_LIGHT_THEME,
} from "@/constants";
import { loader } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

export const useMonacoTheme = () => {
  const { resolvedTheme } = useTheme();
  const [isShikiReady, setIsShikiReady] = useState(false);

  const theme =
    resolvedTheme === "light"
      ? DEFAULT_MONACO_LIGHT_THEME
      : DEFAULT_MONACO_DARK_THEME;

  useEffect(() => {
    loader.init().then(async (monaco) => {
      const highlighter = await createHighlighter({
        themes: ["vitesse-dark", "vitesse-light"],
        langs: ["json"],
      });

      monaco.languages.register({ id: "json" });
      shikiToMonaco(highlighter, monaco);

      setIsShikiReady(true);
    });
  }, []);

  return { theme, isShikiReady };
};

import { useCallback } from "react";
import { $patchStyleText } from "@lexical/selection";

import {
  $getSelection,
  $INTERNAL_isPointSelection,
  LexicalEditor,
} from "lexical";

export function useTextFormat(activeEditor: LexicalEditor) {
  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($INTERNAL_isPointSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );

  return { applyStyleText, onFontColorSelect, onBgColorSelect };
}

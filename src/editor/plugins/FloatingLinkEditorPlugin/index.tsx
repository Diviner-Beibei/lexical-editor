/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "./index.css";

// import { $isAutoLinkNode, $isLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { $findMatchingParent, mergeRegister } from "@lexical/utils";
// import {
//   $getSelection,
//   $isRangeSelection,
//   CLICK_COMMAND,
//   COMMAND_PRIORITY_CRITICAL,
//   COMMAND_PRIORITY_LOW,
//   SELECTION_CHANGE_COMMAND,
// } from "lexical";
import { Dispatch } from "react";
import { createPortal } from "react-dom";

import FloatingLinkEditor from "./FloatingLinkEditor";
import { useFloatingLinkEditorPlugin } from "./useFloatingLinkEditorPlugin";

function FloatingLinkEditorPlugin({
  anchorElem = document.body,
  isLinkEditMode,
  setIsLinkEditMode,
}: {
  anchorElem?: HTMLElement;
  isLinkEditMode: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const { isLink, setIsLink, activeEditor } =
    useFloatingLinkEditorPlugin(editor);

  return createPortal(
    <FloatingLinkEditor
      editor={activeEditor}
      isLink={isLink}
      setIsLink={setIsLink}
      anchorElem={anchorElem}
      isLinkEditMode={isLinkEditMode}
      setIsLinkEditMode={setIsLinkEditMode}
    />,
    anchorElem
  );
}

export default FloatingLinkEditorPlugin;

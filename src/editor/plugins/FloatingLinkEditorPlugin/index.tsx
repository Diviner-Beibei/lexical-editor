/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "./index.css";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createPortal } from "react-dom";

import FloatingLinkEditor from "./FloatingLinkEditor";
import { useFloatingLinkEditorPlugin } from "./useFloatingLinkEditorPlugin";

function FloatingLinkEditorPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
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
    />,
    anchorElem
  );
}

export default FloatingLinkEditorPlugin;

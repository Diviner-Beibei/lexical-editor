import { useEffect, useState } from "react";
import { EditorState } from "lexical"; //$getRoot, $getSelection,

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import Placeholder from "./ui/Placeholder";
import ContentEditable from "./ui/ContentEditable";
import { CAN_USE_DOM } from "./shared/canUseDOM";

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    // const root = $getRoot();
    // const selection = $getSelection();
    // console.log("onChange: ", root, selection);
  });
}

function Editor() {
  const placeholder = <Placeholder>{"Enter some rich text..."}</Placeholder>;
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <ImagesPlugin />
        <AutoFocusPlugin />
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            {/* <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} /> */}
          </>
        )}
      </div>
    </>
  );
}

export default Editor;

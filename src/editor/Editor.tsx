import { useEffect, useState } from "react";
import { $getRoot, $getSelection, EditorState } from "lexical";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/Toolbar/ToolbarPlugin";
// import MaxLengthPlugin from "./plugins/MaxLengthPlugin";
import Placeholder from "./ui/Placeholder";
import ContentEditable from "./ui/ContentEditable";

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log("onChange: ", root, selection);
  });
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function Editor() {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const placeholder = <Placeholder>{"Enter some rich text..."}</Placeholder>;

  return (
    <>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <div className="editor-container">
        {/* <MaxLengthPlugin maxLength={50} /> */}
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor">
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </div>
    </>
  );
}

export default Editor;

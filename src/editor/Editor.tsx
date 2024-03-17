import { EditorState } from "lexical"; //$getRoot, $getSelection,
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import Placeholder from "./ui/Placeholder";
import ContentEditable from "./ui/ContentEditable";

interface EditorProps {
  editable?: boolean;
  onChange?: (editorState: EditorState) => void;
  stringifiedEditorState?: string;
}

function Editor({
  editable,
  onChange,
  stringifiedEditorState,
}: EditorProps): JSX.Element {
  const placeholder = <Placeholder>{"请输入内容..."}</Placeholder>;
  const [editor] = useLexicalComposerContext();
  if (stringifiedEditorState !== undefined) {
    const newEditorState = editor.parseEditorState(stringifiedEditorState);
    editor.setEditorState(newEditorState);
  }

  return (
    <>
      <div className="editor-container">
        {editable && <ToolbarPlugin />}

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

        {onChange && <OnChangePlugin onChange={onChange} />}

        <HistoryPlugin />
        <ListPlugin />
        <ImagesPlugin />
        {editable && <AutoFocusPlugin />}
      </div>
    </>
  );
}

export default Editor;

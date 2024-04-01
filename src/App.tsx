import "./index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import theme from "./editor/themes/EditorTheme";
import BeibeiNodes from "./editor/nodes/BeibeiNodes";
import Editor from "./editor/Editor";
import { EditorState } from "lexical";
import { EditorProvider } from "./editor/context/EditorContext";

function onError(error: Error) {
  console.error(error);
}

interface AppProps {
  editable?: boolean;
  onChange?: (editorState: EditorState) => void;
  stringifiedEditorState?: string;
}

function App({ editable, onChange, stringifiedEditorState }: AppProps) {
  const initialConfig = {
    namespace: "Beibei",
    theme,
    nodes: [...BeibeiNodes],
    onError,
    editable: editable,
  };

  return (
    <EditorProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-shell" data-testid="editor">
          <Editor
            onChange={onChange}
            editable={editable}
            stringifiedEditorState={stringifiedEditorState}
          />
        </div>
      </LexicalComposer>
    </EditorProvider>
  );
}

export default App;

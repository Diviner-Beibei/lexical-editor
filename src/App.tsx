import "./index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import theme from "./editor/themes/PlaygroundEditorTheme";
import PlaygroundNodes from "./editor/nodes/PlaygroundNodes";
import Editor from "./editor/Editor";
import { EditorProvider } from "./editor/context/EditorContext";

function onError(error: Error) {
  console.error(error);
}

function App() {
  const initialConfig = {
    namespace: "Playground",
    theme,
    nodes: [...PlaygroundNodes],
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-shell">
        <EditorProvider>
          <Editor />
        </EditorProvider>
      </div>
    </LexicalComposer>
  );
}

export default App;

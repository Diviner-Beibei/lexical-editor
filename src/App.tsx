import "./index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import theme from "./editor/themes/EditorTheme";
import BeibeiNodes from "./editor/nodes/BeibeiNodes";
import Editor from "./editor/Editor";
import { EditorProvider } from "./editor/context/EditorContext";

function onError(error: Error) {
  console.error(error);
}

function App() {
  const initialConfig = {
    namespace: "Beibei",
    theme,
    nodes: [...BeibeiNodes],
    onError,
  };

  return (
    <EditorProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-shell">
          <Editor />
        </div>
      </LexicalComposer>
    </EditorProvider>
  );
}

export default App;

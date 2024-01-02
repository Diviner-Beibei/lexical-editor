import "./index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import theme from "./editor/themes/PlaygroundEditorTheme";
import PlaygroundNodes from "./editor/nodes/PlaygroundNodes";
import Editor from "./editor/Editor";

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
      <header>
        <a href="https://lexical.dev" target="_blank" rel="noreferrer">
          <img src="/images/icons/logo.svg" alt="Lexical Logo" />
        </a>
      </header>
      <div className="editor-shell">
        <Editor />
      </div>
    </LexicalComposer>
  );
}

export default App;

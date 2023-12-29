import Editor from "./editor/Editor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import theme from "./editor/themes/PlaygroundEditorTheme";

function onError(error: Error) {
  console.error(error);
}

function App() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
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

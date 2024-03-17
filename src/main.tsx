import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EditorState } from "lexical";

function onChange(editorState: EditorState) {
  // Call toJSON on the EditorState object, which produces a serialization safe string
  const editorStateJSON = JSON.stringify(editorState);
  // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify

  console.log("onChange: ", editorStateJSON);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App onChange={onChange} editable={true} />
  </React.StrictMode>
);

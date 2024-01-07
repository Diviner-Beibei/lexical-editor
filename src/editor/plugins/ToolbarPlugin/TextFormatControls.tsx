import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";

interface TextFormatControlsProps {
  isEditable: boolean;
  IS_APPLE: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  activeEditor: LexicalEditor;
  editor: LexicalEditor;
}

function TextFormatControls({
  isEditable,
  IS_APPLE,
  isBold,
  isItalic,
  isUnderline,
  activeEditor,
}: TextFormatControlsProps) {
  return (
    <>
      <button
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
        type="button"
        aria-label={`Format text as bold. Shortcut: ${
          IS_APPLE ? "⌘B" : "Ctrl+B"
        }`}
      >
        <i className="format bold" />
      </button>
      <button
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
        type="button"
        aria-label={`Format text as italics. Shortcut: ${
          IS_APPLE ? "⌘I" : "Ctrl+I"
        }`}
      >
        <i className="format italic" />
      </button>
      <button
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
        type="button"
        aria-label={`Format text to underlined. Shortcut: ${
          IS_APPLE ? "⌘U" : "Ctrl+U"
        }`}
      >
        <i className="format underline" />
      </button>
    </>
  );
}

export default TextFormatControls;

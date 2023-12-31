import { useCallback } from "react";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import { sanitizeUrl } from "../../utils/url";

interface TextFormatControlsProps {
  isEditable: boolean;
  IS_APPLE: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isLink: boolean;
  activeEditor: LexicalEditor;
  editor: LexicalEditor;
}

function TextFormatControls({
  isEditable,
  IS_APPLE,
  isBold,
  isItalic,
  isUnderline,
  isLink,
  activeEditor,
  editor,
}: TextFormatControlsProps) {
  const insertLink = useCallback(() => {
    console.log("insertLink");
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

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
      <button
        disabled={!isEditable}
        onClick={insertLink}
        className={"toolbar-item spaced " + (isLink ? "active" : "")}
        aria-label="Insert link"
        title="Insert link"
        type="button"
      >
        <i className="format link" />
      </button>
    </>
  );
}

export default TextFormatControls;

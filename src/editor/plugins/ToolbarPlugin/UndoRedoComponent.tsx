import { REDO_COMMAND, UNDO_COMMAND, LexicalEditor } from "lexical";

interface UndoRedoComponentProps {
  activeEditor: LexicalEditor;
  canUndo: boolean;
  canRedo: boolean;
  isEditable: boolean;
  IS_APPLE: boolean;
}

function UndoRedoComponent({
  activeEditor,
  canUndo,
  canRedo,
  isEditable,
  IS_APPLE,
}: UndoRedoComponentProps) {
  return (
    <>
      <button
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        type="button"
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
        type="button"
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
    </>
  );
}

export default UndoRedoComponent;

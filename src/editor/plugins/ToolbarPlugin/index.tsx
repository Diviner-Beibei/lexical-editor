import { useEffect, useState, Dispatch } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";
import { IS_APPLE } from "../../shared/environment";
import { useToggleLinkEditMode } from "../../hooks/useToggleLinkEditMode";
import {
  useUpdateToolbar,
  useEditorToolbarState,
} from "../../hooks/useToolbarStateHooks";
import { useTextFormat } from "../../hooks/useTextFormat";
import DropdownColorPicker from "../../ui/DropdownColorPicker";
import UndoRedoComponent from "./UndoRedoComponent";
import TextFormatControls from "./TextFormatControls";
import InsertMediaDropdown from "./InsertMediaDropdown";
import BlockFormatDropDown from "./BlockFormatDropDown";
import ElementFormatDropdown from "./ElementFormatDropdown";
import Divider from "../../ui/Divider";

function ToolbarPlugin({
  setIsLinkEditMode,
}: {
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const {
    $updateToolbar,
    blockType,
    fontColor,
    bgColor,
    elementFormat,
    isBold,
    isItalic,
    isUnderline,
    isRTL,
    isLink,
  } = useUpdateToolbar(activeEditor);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  const { canUndo, canRedo, isEditable } = useEditorToolbarState(
    editor,
    activeEditor,
    $updateToolbar
  );

  useToggleLinkEditMode(activeEditor, isLink, setIsLinkEditMode); //
  const { onFontColorSelect, onBgColorSelect } = useTextFormat(activeEditor);

  return (
    <div className="toolbar">
      <UndoRedoComponent
        activeEditor={activeEditor}
        canRedo={canRedo}
        canUndo={canUndo}
        isEditable={isEditable}
        IS_APPLE={IS_APPLE}
      />
      <Divider />
      <BlockFormatDropDown
        disabled={!isEditable}
        blockType={blockType}
        editor={editor}
      />
      <Divider />

      <TextFormatControls
        activeEditor={activeEditor}
        editor={editor}
        isEditable={isEditable}
        IS_APPLE={IS_APPLE}
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isLink={isLink}
      />
      <DropdownColorPicker
        disabled={!isEditable}
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting text color"
        buttonIconClassName="icon font-color"
        color={fontColor}
        onChange={onFontColorSelect}
        title="text color"
      />
      <DropdownColorPicker
        disabled={!isEditable}
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting background color"
        buttonIconClassName="icon bg-color"
        color={bgColor}
        onChange={onBgColorSelect}
        title="bg color"
      />
      <Divider />
      <InsertMediaDropdown
        isEditable={isEditable}
        activeEditor={activeEditor}
      />

      <Divider />
      <ElementFormatDropdown
        disabled={!isEditable}
        value={elementFormat}
        editor={editor}
        isRTL={isRTL}
      />
    </div>
  );
}

export default ToolbarPlugin;

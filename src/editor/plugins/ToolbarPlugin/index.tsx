import { useCallback, useEffect, useState, Dispatch } from "react"; //Dispatch
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";
import { IS_APPLE } from "../../shared/environment";

import DropDown, { DropDownItem } from "../../ui/DropDown";
import DropdownColorPicker from "../../ui/DropdownColorPicker";
import {
  INSERT_IMAGE_COMMAND,
  InsertImageDialog,
  InsertImagePayload,
} from "../ImagesPlugin";

import useModal from "../../hooks/useModal";

import { sanitizeUrl } from "../../utils/url";

// import { blockTypeToBlockName } from "./common";
import Divider from "../../ui/Divider";
import BlockFormatDropDown from "./BlockFormatDropDown";
import ElementFormatDropdown from "./ElementFormatDropdown";

import { useToggleLinkEditMode } from "../../hooks/useToggleLinkEditMode";
import {
  useUpdateToolbar,
  useEditorToolbarState,
} from "../../hooks/useToolbarStateHooks";
import { useTextFormat } from "../../hooks/useTextFormat";
import UndoRedoComponent from "./UndoRedoComponent";
import TextFormatControls from "./TextFormatControls";

function ToolbarPlugin({
  setIsLinkEditMode,
}: {
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [modal, showModal] = useModal();

  const {
    $updateToolbar,
    blockType,
    rootType,
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

  const insertLink = useCallback(() => {
    console.log("insertLink");
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const insertGifOnClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

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
        rootType={rootType}
        editor={editor}
      />
      <Divider />

      <>
        <TextFormatControls
          activeEditor={activeEditor}
          isEditable={isEditable}
          IS_APPLE={IS_APPLE}
          isBold={isBold}
          isItalic={isItalic}
          isUnderline={isUnderline}
          isLink={isLink}
          insertLink={insertLink}
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

        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item spaced"
          buttonLabel="Insert"
          buttonAriaLabel="Insert specialized editor node"
          buttonIconClassName="icon plus"
        >
          <DropDownItem
            onClick={() => {
              showModal("Insert Image", (onClose) => (
                <InsertImageDialog
                  activeEditor={activeEditor}
                  onClose={onClose}
                />
              ));
            }}
            className="item"
          >
            <i className="icon image" />
            <span className="text">Image</span>
          </DropDownItem>
          <DropDownItem
            onClick={() =>
              insertGifOnClick({
                altText: "Cat typing on a laptop",
                src: "/images/gif/cat-typing.gif",
              })
            }
            className="item"
          >
            <i className="icon gif" />
            <span className="text">GIF</span>
          </DropDownItem>
        </DropDown>
      </>

      <Divider />
      <ElementFormatDropdown
        disabled={!isEditable}
        value={elementFormat}
        editor={editor}
        isRTL={isRTL}
      />

      {modal}
    </div>
  );
}

export default ToolbarPlugin;

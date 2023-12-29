import { Dispatch, useCallback, useEffect, useState } from "react";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
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

import { blockTypeToBlockName } from "./common";
import Divider from "../../ui/Divider";
import BlockFormatDropDown from "./BlockFormatDropDown";
import ElementFormatDropdown from "./ElementFormatDropdown";

import { useToggleLinkEditModeCommand } from "../../hooks/useToolbarRegistration";
import {
  useUpdateToolbar,
  useEditorToolbarState,
} from "../../hooks/useToolbarStateHooks";
import { useTextStyleHooks } from "../../hooks/useTextStyleHooks";

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
    isLink,
    isBold,
    isItalic,
    isUnderline,
    isRTL,
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

  useToggleLinkEditModeCommand(activeEditor, isLink, setIsLinkEditMode);
  const { onFontColorSelect, onBgColorSelect } =
    useTextStyleHooks(activeEditor);

  const insertLink = useCallback(() => {
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
      <Divider />
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
            disabled={!isEditable}
            blockType={blockType}
            rootType={rootType}
            editor={editor}
          />
          <Divider />
        </>
      )}
      {
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
          {rootType === "table" && (
            <>
              <DropDown
                disabled={!isEditable}
                buttonClassName="toolbar-item spaced"
                buttonLabel="Table"
                buttonAriaLabel="Open table toolkit"
                buttonIconClassName="icon table secondary"
              >
                <DropDownItem
                  onClick={() => {
                    /**/
                  }}
                  className="item"
                >
                  <span className="text">TODO</span>
                </DropDownItem>
              </DropDown>
              <Divider />
            </>
          )}
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
      }
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

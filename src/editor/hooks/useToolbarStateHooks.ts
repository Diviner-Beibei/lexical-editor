import { useCallback, useEffect, useState } from "react";
import {
  LexicalEditor,
  ElementFormatType,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $getSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from "lexical";
import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
} from "@lexical/selection";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";

import { getSelectedNode } from "../utils/getSelectedNode";
import { blockTypeToBlockName } from "../plugins/ToolbarPlugin/ToolbarPluginData";
import { mergeRegister } from "@lexical/utils";

export function useUpdateToolbar(activeEditor: LexicalEditor) {
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
      // Handle buttons
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || "left"
      );
    }
  }, [activeEditor]);

  return {
    $updateToolbar,
    blockType,
    fontColor,
    bgColor,
    elementFormat,
    isLink,
    isBold,
    isItalic,
    isUnderline,
    isStrikethrough,
    isSubscript,
    isSuperscript,
    isCode,
    isRTL,
  };
}

export function useEditorToolbarState(
  editor: LexicalEditor,
  activeEditor: LexicalEditor,
  $updateToolbar: () => void
) {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [
    $updateToolbar,
    activeEditor,
    editor,
    setIsEditable,
    setCanUndo,
    setCanRedo,
  ]);

  return { canUndo, canRedo, isEditable };
}

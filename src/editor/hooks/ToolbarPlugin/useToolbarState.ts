import { useCallback, useState } from "react";
import {
  LexicalEditor,
  ElementFormatType,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $getSelection,
  ElementNode,
  TextNode,
} from "lexical";
import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
} from "@lexical/selection";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";

import { getSelectedNode } from "../../utils/getSelectedNode";
import { blockTypeToBlockName } from "../../plugins/ToolbarPlugin/ToolbarPluginData";

function getRootOrShadowRoot(anchorNode: ElementNode | TextNode) {
  if (anchorNode.getKey() === "root") {
    return anchorNode;
  }

  return $findMatchingParent(anchorNode, (e) => {
    const parent = e.getParent();
    return parent !== null && $isRootOrShadowRoot(parent);
  });
}

type blockType = keyof typeof blockTypeToBlockName;

function setBlockTypeIfElementExists(
  anchorNode: ElementNode | TextNode,
  element: ElementNode | null,
  elementDOM: HTMLElement | null,
  setBlockType: (type: blockType) => void
) {
  if (elementDOM === null) return;

  if ($isListNode(element)) {
    const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
    const type: blockType = parentList
      ? parentList.getListType()
      : element.getListType();
    setBlockType(type);
  } else {
    const type = $isHeadingNode(element)
      ? element.getTag()
      : (element as ElementNode).getType();
    if (type in blockTypeToBlockName) {
      setBlockType(type as blockType);
    }
  }
}

export function useUpdateToolbar(activeEditor: LexicalEditor) {
  const [blockType, setBlockType] = useState<blockType>("paragraph");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element = getRootOrShadowRoot(anchorNode);

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = (element as ElementNode).getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      setBlockTypeIfElementExists(
        anchorNode,
        element as ElementNode,
        elementDOM,
        setBlockType
      );

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
    isRTL,
  };
}

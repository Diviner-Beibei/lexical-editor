/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from "lexical";

import "./EditorTheme.css";

const theme: EditorThemeClasses = {
  blockCursor: "BeibeiEditorTheme__blockCursor",
  characterLimit: "BeibeiEditorTheme__characterLimit",
  code: "BeibeiEditorTheme__code",
  codeHighlight: {
    atrule: "BeibeiEditorTheme__tokenAttr",
    attr: "BeibeiEditorTheme__tokenAttr",
    boolean: "BeibeiEditorTheme__tokenProperty",
    builtin: "BeibeiEditorTheme__tokenSelector",
    cdata: "BeibeiEditorTheme__tokenComment",
    char: "BeibeiEditorTheme__tokenSelector",
    class: "BeibeiEditorTheme__tokenFunction",
    "class-name": "BeibeiEditorTheme__tokenFunction",
    comment: "BeibeiEditorTheme__tokenComment",
    constant: "BeibeiEditorTheme__tokenProperty",
    deleted: "BeibeiEditorTheme__tokenProperty",
    doctype: "BeibeiEditorTheme__tokenComment",
    entity: "BeibeiEditorTheme__tokenOperator",
    function: "BeibeiEditorTheme__tokenFunction",
    important: "BeibeiEditorTheme__tokenVariable",
    inserted: "BeibeiEditorTheme__tokenSelector",
    keyword: "BeibeiEditorTheme__tokenAttr",
    namespace: "BeibeiEditorTheme__tokenVariable",
    number: "BeibeiEditorTheme__tokenProperty",
    operator: "BeibeiEditorTheme__tokenOperator",
    prolog: "BeibeiEditorTheme__tokenComment",
    property: "BeibeiEditorTheme__tokenProperty",
    punctuation: "BeibeiEditorTheme__tokenPunctuation",
    regex: "BeibeiEditorTheme__tokenVariable",
    selector: "BeibeiEditorTheme__tokenSelector",
    string: "BeibeiEditorTheme__tokenSelector",
    symbol: "BeibeiEditorTheme__tokenProperty",
    tag: "BeibeiEditorTheme__tokenProperty",
    url: "BeibeiEditorTheme__tokenOperator",
    variable: "BeibeiEditorTheme__tokenVariable",
  },
  embedBlock: {
    base: "BeibeiEditorTheme__embedBlock",
    focus: "BeibeiEditorTheme__embedBlockFocus",
  },
  hashtag: "BeibeiEditorTheme__hashtag",
  heading: {
    h1: "BeibeiEditorTheme__h1",
    h2: "BeibeiEditorTheme__h2",
    h3: "BeibeiEditorTheme__h3",
    h4: "BeibeiEditorTheme__h4",
    h5: "BeibeiEditorTheme__h5",
    h6: "BeibeiEditorTheme__h6",
  },
  image: "editor-image",
  indent: "BeibeiEditorTheme__indent",
  inlineImage: "inline-editor-image",
  layoutContainer: "BeibeiEditorTheme__layoutContainer",
  layoutItem: "BeibeiEditorTheme__layoutItem",
  link: "BeibeiEditorTheme__link",
  list: {
    listitem: "BeibeiEditorTheme__listItem",
    listitemChecked: "BeibeiEditorTheme__listItemChecked",
    listitemUnchecked: "BeibeiEditorTheme__listItemUnchecked",
    nested: {
      listitem: "BeibeiEditorTheme__nestedListItem",
    },
    olDepth: [
      "BeibeiEditorTheme__ol1",
      "BeibeiEditorTheme__ol2",
      "BeibeiEditorTheme__ol3",
      "BeibeiEditorTheme__ol4",
      "BeibeiEditorTheme__ol5",
    ],
    ul: "BeibeiEditorTheme__ul",
  },
  ltr: "BeibeiEditorTheme__ltr",
  mark: "BeibeiEditorTheme__mark",
  markOverlap: "BeibeiEditorTheme__markOverlap",
  paragraph: "BeibeiEditorTheme__paragraph",
  quote: "BeibeiEditorTheme__quote",
  rtl: "BeibeiEditorTheme__rtl",
  table: "BeibeiEditorTheme__table",
  tableAddColumns: "BeibeiEditorTheme__tableAddColumns",
  tableAddRows: "BeibeiEditorTheme__tableAddRows",
  tableCell: "BeibeiEditorTheme__tableCell",
  tableCellActionButton: "BeibeiEditorTheme__tableCellActionButton",
  tableCellActionButtonContainer:
    "BeibeiEditorTheme__tableCellActionButtonContainer",
  tableCellEditing: "BeibeiEditorTheme__tableCellEditing",
  tableCellHeader: "BeibeiEditorTheme__tableCellHeader",
  tableCellPrimarySelected: "BeibeiEditorTheme__tableCellPrimarySelected",
  tableCellResizer: "BeibeiEditorTheme__tableCellResizer",
  tableCellSelected: "BeibeiEditorTheme__tableCellSelected",
  tableCellSortedIndicator: "BeibeiEditorTheme__tableCellSortedIndicator",
  tableResizeRuler: "BeibeiEditorTheme__tableCellResizeRuler",
  tableSelected: "BeibeiEditorTheme__tableSelected",
  tableSelection: "BeibeiEditorTheme__tableSelection",
  text: {
    bold: "BeibeiEditorTheme__textBold",
    code: "BeibeiEditorTheme__textCode",
    italic: "BeibeiEditorTheme__textItalic",
    strikethrough: "BeibeiEditorTheme__textStrikethrough",
    subscript: "BeibeiEditorTheme__textSubscript",
    superscript: "BeibeiEditorTheme__textSuperscript",
    underline: "BeibeiEditorTheme__textUnderline",
    underlineStrikethrough: "BeibeiEditorTheme__textUnderlineStrikethrough",
  },
};

export default theme;

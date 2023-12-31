import { ElementFormatType } from "lexical";

export const blockTypeToBlockName = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  bullet: "Bulleted List",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

export const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

export const ELEMENT_FORMAT_OPTIONS: {
  [key in Exclude<ElementFormatType, "">]: {
    icon: string;
    iconRTL: string;
    name: string;
  };
} = {
  center: {
    icon: "center-align",
    iconRTL: "center-align",
    name: "Center Align",
  },
  end: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "End Align",
  },
  justify: {
    icon: "justify-align",
    iconRTL: "justify-align",
    name: "Justify Align",
  },
  left: {
    icon: "left-align",
    iconRTL: "left-align",
    name: "Left Align",
  },
  right: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "Right Align",
  },
  start: {
    icon: "left-align",
    iconRTL: "right-align",
    name: "Start Align",
  },
};

export function dropDownActiveClass(active: boolean) {
  if (active) return "active dropdown-item-active";
  else return "";
}

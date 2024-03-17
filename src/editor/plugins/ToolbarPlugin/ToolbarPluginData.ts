import { ElementFormatType } from "lexical";

export const blockTypeToBlockName = {
  check: "Check List",
  code: "Code Block",
  h1: "标题 1",
  h2: "标题 2",
  h3: "标题 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  bullet: "无序列表",
  number: "有序列表",
  paragraph: "标准",
  quote: "引用",
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
    name: "居中对齐",
  },
  end: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "结尾对齐",
  },
  justify: {
    icon: "justify-align",
    iconRTL: "justify-align",
    name: "两端对齐",
  },
  left: {
    icon: "left-align",
    iconRTL: "left-align",
    name: "左对齐",
  },
  right: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "右对齐",
  },
  start: {
    icon: "left-align",
    iconRTL: "right-align",
    name: "开始对齐",
  },
};

export function dropDownActiveClass(active: boolean) {
  if (active) return "active dropdown-item-active";
  else return "";
}

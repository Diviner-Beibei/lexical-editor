/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Klass, LexicalNode } from "lexical";

import { HashtagNode } from "@lexical/hashtag";
import { ListItemNode, ListNode } from "@lexical/list";
import { OverflowNode } from "@lexical/overflow";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { EmojiNode } from "./EmojiNode";
import { ImageNode } from "./ImageNode";
import { KeywordNode } from "./KeywordNode";
import { StickyNode } from "./StickyNode";

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  HashtagNode,
  OverflowNode,
  StickyNode,
  ImageNode,
  EmojiNode,
  KeywordNode,
];

export default PlaygroundNodes;

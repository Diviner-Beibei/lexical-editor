import { useEffect, Dispatch } from "react"; //Dispatch
import { COMMAND_PRIORITY_NORMAL, KEY_MODIFIER_COMMAND } from "lexical";
import { sanitizeUrl } from "../utils/url";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { LexicalEditor } from "lexical";

export function useToggleLinkEditModeCommand(
  activeEditor: LexicalEditor,
  isLink: boolean,
  setIsLinkEditMode: Dispatch<boolean>
) {
  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        console.log("useToggleLinkEditModeCommand:", code, ctrlKey, metaKey);

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          let url: string | null;

          if (!isLink) {
            setIsLinkEditMode(true);
            url = sanitizeUrl("https://");
          } else {
            setIsLinkEditMode(false);
            url = null;
          }
          return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [activeEditor, isLink, setIsLinkEditMode]); //
}

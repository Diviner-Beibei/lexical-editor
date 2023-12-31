import { LexicalEditor } from "lexical";
import DropDown, { DropDownItem } from "../../ui/DropDown";
import useModal from "../../hooks/useModal";
import {
  INSERT_IMAGE_COMMAND,
  InsertImageDialog,
  InsertImagePayload,
} from "../ImagesPlugin";

interface InsertMediaDropdownProps {
  isEditable: boolean;
  activeEditor: LexicalEditor;
}

function InsertMediaDropdown({
  isEditable,
  activeEditor,
}: InsertMediaDropdownProps) {
  const [modal, showModal] = useModal();

  const insertGifOnClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <>
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
      {modal}
    </>
  );
}

export default InsertMediaDropdown;

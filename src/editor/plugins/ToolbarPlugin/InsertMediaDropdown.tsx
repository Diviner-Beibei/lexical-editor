import { LexicalEditor } from "lexical";
import DropDown, { DropDownItem } from "../../ui/DropDown";
import useModal from "../../hooks/useModal";
import { InsertImageDialog } from "../ImagesPlugin";

interface InsertMediaDropdownProps {
  isEditable: boolean;
  activeEditor: LexicalEditor;
}

function InsertMediaDropdown({
  isEditable,
  activeEditor,
}: InsertMediaDropdownProps) {
  const [modal, showModal] = useModal();

  return (
    <>
      <DropDown
        disabled={!isEditable}
        buttonClassName="toolbar-item spaced"
        buttonLabel="插入"
        buttonAriaLabel="Insert specialized editor node"
        buttonIconClassName="icon plus"
      >
        <DropDownItem
          onClick={() => {
            showModal("插入图片", (onClose) => (
              <InsertImageDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
          className="item"
        >
          <i className="icon image" />
          <span className="text">图片</span>
        </DropDownItem>
      </DropDown>
      {modal}
    </>
  );
}

export default InsertMediaDropdown;

import { createContext, useReducer, useContext } from "react";

type ContextShape = {
  setIsLinkEditMode: (isLinkEditMode: boolean) => void;
  getIsLinkEditMode: () => boolean;
};
interface StateProps {
  isLinkEditMode: boolean;
}
type ActionType = "setIsLinkEditMode";
type Action = { type: ActionType; payload: unknown };

const EditorContext = createContext<ContextShape | null>(null);

const initialState: StateProps = {
  isLinkEditMode: false,
};

function reducer(state: StateProps, action: Action) {
  switch (action.type) {
    case "setIsLinkEditMode":
      return {
        ...state,
        isLinkEditMode: action.payload as boolean,
      };
    default:
      throw new Error("Unknown action");
  }
}

interface EditorProviderProps {
  children: React.ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  const [{ isLinkEditMode }, dispatch] = useReducer(reducer, initialState);

  function setIsLinkEditMode(isLinkEditMode: boolean) {
    dispatch({ type: "setIsLinkEditMode", payload: isLinkEditMode });
  }

  function getIsLinkEditMode() {
    return isLinkEditMode;
  }

  return (
    <EditorContext.Provider value={{ setIsLinkEditMode, getIsLinkEditMode }}>
      {children}
    </EditorContext.Provider>
  );
}

// Step 3: Create a custom hook to use this context
export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorProvider");
  }
  return context;
}

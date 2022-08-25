import { IMainState, IInputState, IResource } from "../utils/types";
import {useState, useEffect} from "react";
import getResourceById from "../utils/getResourceById";
import serverUrl from "../utils/serverUrl";
import axios from "axios";

interface IProps {
  mainState: IMainState;
  setMainState: React.Dispatch<React.SetStateAction<IMainState>>
}

function SubmitResourcePage({ mainState, setMainState }: IProps): JSX.Element { 
  const {arrayOfAllResources, idOfResourceToEditOrNull} = mainState;
  const [inputState, setInputState] = useState<IInputState>({
    titleInput: "",
    typeInput: "",
    linkInput: "",
    messageInput: "",
  });
  const resourceToEdit = getResourceById(arrayOfAllResources, idOfResourceToEditOrNull);
  const {title, type, link, message} = resourceToEdit;
  useEffect(() => {
    setInputState({
      titleInput: title,
      typeInput: type,
      linkInput: link,
      messageInput: message ?? ""
    });
  }, [mainState]);
  function updateStateOnInputChange(event: React.ChangeEvent<HTMLInputElement>, valueToChange: keyof IInputState): void {
    setInputState(state => {
      const newState = {...state}
      newState[valueToChange] = event.target.value;
      return newState;
    });
  }
  async function handleSubmitClick(): Promise<void> {
    if (idOfResourceToEditOrNull === null) {
      await axios.post(`${serverUrl}/rec`, {...inputState});
    } else {
      await axios.put(`${serverUrl}/rec/${idOfResourceToEditOrNull}`);
    }
    const apiGetResponse: IResource[] = (await axios.get(`${serverUrl}/rec`)).data.data;
    setMainState({
      arrayOfAllResources: apiGetResponse,
      pageToDisplay: "homepage",
      idOfResourceToEditOrNull: null
    });
  }
  return (
    <>
      <input value={inputState.titleInput} onChange={e => updateStateOnInputChange(e, "titleInput")} />
      <input value={inputState.typeInput} onChange={e => updateStateOnInputChange(e, "typeInput")} />
      <input value={inputState.linkInput} onChange={e => updateStateOnInputChange(e, "linkInput")} />
      <input value={inputState.messageInput} onChange={e => updateStateOnInputChange(e, "messageInput")} />
      <button onClick={handleSubmitClick} >Submit</button>
    </>
  );
}

export default SubmitResourcePage;

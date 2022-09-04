import { IMainState, IInputState, IResource } from "../utils/types";
import { useState, useEffect } from "react";
import getResourceById from "../utils/getResourceById";
import serverUrl from "../utils/serverUrl";
import axios from "axios";

interface IProps {
  mainState: IMainState;
  setMainState: React.Dispatch<React.SetStateAction<IMainState>>;
}

function SubmitResourcePage({ mainState, setMainState }: IProps): JSX.Element {
  const { arrayOfAllResources, idOfResourceToEditOrNull } = mainState;
  const [inputState, setInputState] = useState<IInputState>({
    descriptionInput: "",
    typeInput: "",
    linkInput: "",
    likes: 0,
  });
  useEffect(() => {
    const resourceToEdit = getResourceById(
      arrayOfAllResources,
      idOfResourceToEditOrNull
    );
    const { description, type, link, likes } = resourceToEdit;
    setInputState({
      descriptionInput: description,
      typeInput: type,
      linkInput: link,
      likes: likes,
    });
  }, [arrayOfAllResources, idOfResourceToEditOrNull]);
  function updateStateOnInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    valueToChange: "descriptionInput" | "linkInput" | "typeInput"
  ): void {
    setInputState((state) => {
      const newState = { ...state };
      newState[valueToChange] = event.target.value;
      return newState;
    });
  }
  async function handleSubmitClick(): Promise<void> {
    const reqBody = {
      description: inputState.descriptionInput,
      type: inputState.typeInput,
      link: inputState.linkInput,
      likes: inputState.likes,
    };
    if (idOfResourceToEditOrNull === null) {
      await axios.post(`${serverUrl}/rec`, reqBody);
    } else {
      await axios.put(`${serverUrl}/rec/${idOfResourceToEditOrNull}`, reqBody);
    }
    const apiGetResponse: IResource[] = (await axios.get(`${serverUrl}/rec`))
      .data.data;
    setMainState({
      arrayOfAllResources: apiGetResponse,
      pageToDisplay: "homepage",
      idOfResourceToEditOrNull: null,
    });
  }
  function handleReturnClick(): void {
    setMainState((state) => {
      const newState = { ...state };
      newState.idOfResourceToEditOrNull = null;
      newState.pageToDisplay = "homepage";
      return newState;
    });
  }
  return (
    <>
      <div id="inputs">
        <label className="label" id="desc-label" htmlFor="description">
          Description:{" "}
        </label>
        <input
          className="input"
          name="description"
          value={inputState.descriptionInput}
          onChange={(e) => updateStateOnInputChange(e, "descriptionInput")}
        />
        <label className="label" id="type-label" htmlFor="type">
          Topic:{" "}
        </label>
        <input
          className="input"
          name="type"
          value={inputState.typeInput}
          onChange={(e) => updateStateOnInputChange(e, "typeInput")}
        />
        <label className="label" id="link-label" htmlFor="link">
          Link:{" "}
        </label>
        <input
          className="input"
          name="link"
          value={inputState.linkInput}
          onChange={(e) => updateStateOnInputChange(e, "linkInput")}
        />
      </div>
      <div id="input-buttons">
        <button id="return-button" onClick={handleReturnClick}>
          Return to Homepage
        </button>
        <button id="submit-button" onClick={handleSubmitClick}>
          Submit
        </button>
      </div>
    </>
  );
}

export default SubmitResourcePage;

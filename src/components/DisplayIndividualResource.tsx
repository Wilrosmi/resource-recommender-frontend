import { IResource, IMainState } from "../utils/types";
import axios from "axios";
import serverUrl from "../utils/serverUrl";

interface IProps {
  resource: IResource;
  mainState: IMainState;
  setMainState: React.Dispatch<React.SetStateAction<IMainState>>;
}

function DisplayIndividualResource({
  resource,
  mainState,
  setMainState,
}: IProps): JSX.Element {
  function onEditClick(): void {
    setMainState((state) => {
      const newState = { ...state };
      newState.pageToDisplay = "resourcePage";
      newState.idOfResourceToEditOrNull = resource.id;
      return newState;
    });
  }
  async function onDeleteClick(): Promise<void> {
    await axios.delete(`${serverUrl}/rec/${resource.id}`);
    const newDataFromApi: IResource[] = (await axios.get(`${serverUrl}/rec`))
      .data.data;
    setMainState((state) => {
      const newState = { ...state };
      newState.arrayOfAllResources = newDataFromApi;
      return newState;
    });
  }
  return (
    <>
      <h1>{resource.title}</h1>
      <h3>{resource.type}</h3>
      <h3>{resource.link}</h3>
      <p>{resource.message ?? ""}</p>
      <p>{resource.time}</p>
      <button onClick={onEditClick}>Edit Resource</button>
      <button onClick={onDeleteClick}>Delete Resource</button>
    </>
  );
}

export default DisplayIndividualResource;

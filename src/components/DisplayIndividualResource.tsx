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
    <div className="resource">
      <h1 className="res-title">{resource.title}</h1>
      <h3 className="res-type">{resource.type}</h3>
      <h3 className="res-link">{resource.link}</h3>
      <p className="res-message">{resource.message ?? ""}</p>
      <p className="res-time">{resource.time}</p>
      <button className="res-edit" onClick={onEditClick}>Edit Resource</button>
      <button className="res-delete" onClick={onDeleteClick}>Delete Resource</button>
    </div>
  );
}

export default DisplayIndividualResource;

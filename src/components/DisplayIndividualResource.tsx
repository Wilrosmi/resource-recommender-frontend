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
  async function onLikeClick(): Promise<void> {
    resource.likes++;
    const reqBody = {
      description: resource.description,
      type: resource.type,
      link: resource.link,
      likes: resource.likes,
    };
    await axios.put(`${serverUrl}/rec/${resource.id}`, reqBody);
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
      <p className="res res-description">{resource.description}</p>
      <p className="res type">{resource.type}</p>
      <p className="res link">{resource.link}</p>
      <p className="res time">{resource.time.slice(0, 10)}</p>
      <div className="res likes">
        <p className="res likes-tally">{resource.likes}</p>
        <button className="res like-button" onClick={onLikeClick}>
          +1
        </button>
      </div>
      <button className="res edit" onClick={onEditClick}>
        Edit Resource
      </button>
      <button className="res delete" onClick={onDeleteClick}>
        Delete Resource
      </button>
    </div>
  );
}

export default DisplayIndividualResource;

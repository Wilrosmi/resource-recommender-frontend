import { IMainState } from "../utils/types";
import DisplayIndividualResource from "./DisplayIndividualResource";

interface IProps {
  mainState: IMainState;
  setMainState: React.Dispatch<React.SetStateAction<IMainState>>;
}

function Homepage({ mainState, setMainState }: IProps): JSX.Element {
  const { arrayOfAllResources } = mainState;
  console.log("arrayOfAllResources: ", arrayOfAllResources);
  function handleNewResourceButtonClick(): void {
    setMainState((state) => {
      const newState = { ...state };
      newState.pageToDisplay = "resourcePage";
      return newState;
    });
  }
  return (
    <>
      <h1 id="page-title">Resource Recommender</h1>
      <button id="create-button" onClick={handleNewResourceButtonClick}>
        Create New Resource
      </button>
      {arrayOfAllResources.map((res) => (
        <DisplayIndividualResource
          key={res.id}
          resource={res}
          mainState={mainState}
          setMainState={setMainState}
        />
      ))}
    </>
  );
}

export default Homepage;

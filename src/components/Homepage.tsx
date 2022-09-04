import { IMainState } from "../utils/types";
import DisplayIndividualResource from "./DisplayIndividualResource";
import ColumnHeaders from "./ColumnHeaders";
import { useState } from "react";
import SearchFilter from "./SearchFilter";
import filterBySearchTerm from "../utils/filterBySearchTerm";

interface IProps {
  mainState: IMainState;
  setMainState: React.Dispatch<React.SetStateAction<IMainState>>;
}

function Homepage({ mainState, setMainState }: IProps): JSX.Element {
  const [searchState, setSearchState] = useState("");

  const { arrayOfAllResources } = mainState;
  const filteredResources = filterBySearchTerm(
    arrayOfAllResources,
    searchState
  );
  function handleNewResourceButtonClick(): void {
    setMainState((state) => {
      const newState = { ...state };
      newState.pageToDisplay = "resourcePage";
      return newState;
    });
  }
  return (
    <>
      <div id="homepage-head">
        <h1 id="page-title">Resource Recommendations</h1>
        <button id="create-button" onClick={handleNewResourceButtonClick}>
          Create New Resource
        </button>
      </div>
      <SearchFilter searchState={searchState} setSearchState={setSearchState} />
      <ColumnHeaders />
      <div id="all-resources">
        {filteredResources.map((res) => (
          <DisplayIndividualResource
            key={res.id}
            resource={res}
            mainState={mainState}
            setMainState={setMainState}
          />
        ))}
      </div>
    </>
  );
}

export default Homepage;

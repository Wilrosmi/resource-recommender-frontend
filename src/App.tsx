import { useState, useEffect } from "react";
import { IResource, IMainState } from "./utils/types";
import Homepage from "./components/Homepage";
import SubmitResourcePage from "./components/SubmitResourcePage";
import serverUrl from "./utils/serverUrl";
import axios from "axios";

function App(): JSX.Element {
  const [mainState, setMainState] = useState<IMainState>({
    arrayOfAllResources: [],
    pageToDisplay: "homepage",
    idOfResourceToEditOrNull: null
  });
  // Need to add the ability to deal with failures in the api call
  useEffect(() => {
    async function getAllResourcesAndAssignToState(): Promise<void> {
      const resourcesFromApi: IResource[] = (await axios.get(`${serverUrl}/rec`)).data.data;
      setMainState((state) => {
        const newState = { ...state };
        newState.arrayOfAllResources = resourcesFromApi;
        return newState;
      });
    }
    getAllResourcesAndAssignToState();
  }, []);
  return mainState.pageToDisplay === "homepage" ? (
    <Homepage mainState={mainState} setMainState={setMainState} />
  ) : (
    <SubmitResourcePage mainState={mainState} setMainState={setMainState} />
  );
}

export default App;

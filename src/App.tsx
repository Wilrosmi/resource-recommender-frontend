import { useState, useEffect } from "react";
import { IResource, IState } from "./utils/types";
import Homepage from "./components/Homepage";
import SubmitResourcePage from "./components/SubmitResourcePage";
import serverUrl from "./utils/serverUrl";
import axios from "axios";

function App(): JSX.Element {
  const [state, setState] = useState<IState>({
    arrayOfAllResources: [],
    pageToDisplay: "homepage",
    idOfResourceToDisplay: null,
  });
  // Need to add the ability to deal with failures in the api call
  useEffect(() => {
    async function getAllResourcesAndAssignToState(): Promise<void> {
      const resourcesFromApi: IResource[] = (await axios.get(serverUrl)).data;
      setState((state) => {
        const newState = {...state}
        newState.arrayOfAllResources = resourcesFromApi;
        return newState;
      })
    }  
  }, []);
  return state.pageToDisplay === "homepage" ? <Homepage state={state} /> : <SubmitResourcePage state={state} />;
}

export default App;

import {IState} from "../utils/types";
import DisplayIndividualResource from "./DisplayIndividualResource";

interface IProps {
  state: IState,
}

function Homepage({state}: IProps): JSX.Element {
  const {arrayOfAllResources} = state;   
  return (
    <>
      <h1>Resource Recommender</h1>
      {arrayOfAllResources.map((res) => <DisplayIndividualResource resource={res} />)}
    </>
  );
}

export default Homepage;
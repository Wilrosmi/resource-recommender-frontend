import {IResource} from "../utils/types";

interface IProps {
  resource: IResource
}

function DisplayIndividualResource({resource}: IProps): JSX.Element {
  return (
    <>
      <h1>{resource.title}</h1>
      <h3>{resource.type}</h3>
      <h3>{resource.link}</h3>
      <p>{resource.message ?? ""}</p>
      <p>{resource.timestamp}</p>
    </>
  );
}

export default DisplayIndividualResource;
import {IResource} from "./types";

function getResourceById(allResources: IResource[], id: number | null): IResource {
  const resource = allResources.find(res => res.id === id);
  if (resource === undefined) {
    const emptyResource: IResource = {
      title: "",
      type: "",
      link: "",
      message: "",
      timestamp: "",
      id: -1
    } 
    return emptyResource;
  } else {
    return resource;
  }
}

export default getResourceById;
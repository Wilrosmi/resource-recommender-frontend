import { IResource } from "./types";

function getResourceById(
  allResources: IResource[],
  id: number | null
): IResource {
  const resource = allResources.find((res) => res.id === id);
  if (resource === undefined) {
    const emptyResource: IResource = {
      description: "",
      type: "",
      link: "",
      time: "",
      likes: 0,
      id: -1,
    };
    return emptyResource;
  } else {
    return resource;
  }
}

export default getResourceById;

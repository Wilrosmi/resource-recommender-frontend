import { IResource } from "./types";

function filterBySearchTerm(
  resArr: IResource[],
  searchTerm: string
): IResource[] {
  return resArr.filter(
    (res) =>
      res.description.includes(searchTerm) ||
      res.type.includes(searchTerm) ||
      res.link.includes(searchTerm)
  );
}

export default filterBySearchTerm;

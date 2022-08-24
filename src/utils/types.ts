export interface IResource {
  title: string;
  type: string;
  link: string;
  message: string | null;
  id: number;
  timestamp: string;
}

export interface IState {
  arrayOfAllResources: IResource[];
  pageToDisplay: "homepage" | "resourcePage";
  idOfResourceToDisplay: number | null;
}

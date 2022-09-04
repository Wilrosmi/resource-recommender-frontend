export interface IResource {
  description: string;
  type: string;
  link: string;
  id: number;
  likes: number;
  time: string;
}

export interface IMainState {
  arrayOfAllResources: IResource[];
  pageToDisplay: "homepage" | "resourcePage";
  idOfResourceToEditOrNull: number | null;
}

export interface IInputState {
  descriptionInput: string;
  typeInput: string;
  linkInput: string;
  likes: number;
}

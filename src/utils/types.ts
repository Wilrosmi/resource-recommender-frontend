export interface IResource {
  title: string;
  type: string;
  link: string;
  message: string | null;
  id: number;
  timestamp: string;
}

export interface IMainState {
  arrayOfAllResources: IResource[];
  pageToDisplay: "homepage" | "resourcePage";
  idOfResourceToEditOrNull: number | null
}

export interface IInputState {
  titleInput: string,
  typeInput: string,
  linkInput: string,
  messageInput: string,
}

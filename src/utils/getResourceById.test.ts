import getResourceById from "./getResourceById";
import { IResource } from "./types";

test("Returns correct resource when given a valid id", () => {
  expect(getResourceById(testArrayOfResources, 2)).toEqual({
    description: "2",
    type: "2",
    link: "2",
    likes: 2,
    time: "2",
    id: 2,
  });
});

test("Returns placeholder resource when given null id", () => {
  expect(getResourceById(testArrayOfResources, null)).toEqual({
    description: "",
    type: "",
    link: "",
    likes: 0,
    time: "",
    id: -1,
  });
});

const testArrayOfResources: IResource[] = [
  {
    description: "1",
    type: "1",
    link: "1",
    likes: 1,
    time: "1",
    id: 1,
  },
  {
    description: "2",
    type: "2",
    link: "2",
    likes: 2,
    time: "2",
    id: 2,
  },
  {
    description: "3",
    type: "3",
    link: "3",
    likes: 3,
    time: "3",
    id: 3,
  },
];

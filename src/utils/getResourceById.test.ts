import getResourceById from "./getResourceById";
import { IResource } from "./types";

test("Returns correct resource when given a valid id", () => {
  expect(getResourceById(testArrayOfResources, 2)).toEqual({
    title: "2",
    type: "2",
    link: "2",
    message: "2",
    time: "2",
    id: 2,
  });
});

test("Returns placeholder resource when given null id", () => {
  expect(getResourceById(testArrayOfResources, null)).toEqual({
    title: "",
    type: "",
    link: "",
    message: "",
    time: "",
    id: -1,
  });
});

const testArrayOfResources: IResource[] = [
  {
    title: "1",
    type: "1",
    link: "1",
    message: "1",
    time: "1",
    id: 1,
  },
  {
    title: "2",
    type: "2",
    link: "2",
    message: "2",
    time: "2",
    id: 2,
  },
  {
    title: "3",
    type: "3",
    link: "3",
    message: "3",
    time: "3",
    id: 3,
  },
];

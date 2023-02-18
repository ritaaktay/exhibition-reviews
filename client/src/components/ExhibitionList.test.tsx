import { screen, render } from "@testing-library/react";
import ExhibitionDataService from "../services/ExhibitionDataService";
import ExhibitionsList from "./ExhibitionList";

jest.mock("../services/ExhibitionDataService");

ExhibitionDataService.getAll = jest.fn().mockResolvedValue([]);

test("Has a list of ehibition titles that link to the exhibition page", () => {
  render(<ExhibitionsList />);
});

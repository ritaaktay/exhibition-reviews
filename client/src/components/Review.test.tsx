import { screen, render } from "@testing-library/react";
import Review from "./Review";

test("Has a list of ehibition titles that link to the exhibition page", () => {
  const mockReview = {
    content: "Great exhibition",
    createdAt: "2023-02-17T16:58:27.021Z",
  };
  render(<Review review={mockReview} />);
  const content: HTMLParagraphElement = screen.getByText(/Great exhibition/);
  expect(content).toBe;
});

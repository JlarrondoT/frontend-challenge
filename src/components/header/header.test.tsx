import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HeaderComponent from "./header.component";

test("component renders", () => {
  const component = render(<HeaderComponent />);
  expect(component).toBeTruthy();
});

import { render, screen } from "@testing-library/react"
import Form from "./Form"

test("on load there should be empty search field", () => {
  render(<Form />)
  expect(screen.getByRole("input", { name: /name/i })).toBeEnabled
})

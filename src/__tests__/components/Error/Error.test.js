import { render, screen } from "@testing-library/react"

import Error from "../../../components/Error/Error"

it("proper render Error component", () => {
  render(<Error />)
  const textData = screen.getByText("Что то пошло не так...")
  expect(textData).toBeInTheDocument()
})

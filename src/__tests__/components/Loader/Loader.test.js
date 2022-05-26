import { render, screen } from "@testing-library/react"
import Loader from "../../../components/Loader/Loader"

it("should render Loader component", () => {
  render(<Loader />)
  const loaderData = screen.getByTestId("loader")
  expect(loaderData).toBeInTheDocument()
  expect(screen.getByText("Загрузка карт...")).toBeInTheDocument()
})

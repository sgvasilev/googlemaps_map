import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react"
import renderer from "react-test-renderer"

import { useGoogleAutocomplete } from "../../../helpers/useGoogleAutocomplete"
import Form from "../../../components/Form/Form"
import { UserMarkersProvider } from "../../../context/userMarkers"
import { getPlacesDetails } from "../../../helpers/getPlacesDetails"

jest.mock("../../../helpers/useGoogleAutocomplete")
jest.mock("../../../helpers/getPlacesDetails")

afterEach(() => {
  cleanup()
})

describe("Should properly render Form component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <UserMarkersProvider>
          <Form />
        </UserMarkersProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("should properly handle search value", () => {
    render(
      <UserMarkersProvider>
        <Form />
      </UserMarkersProvider>
    )
    const userLocationInput = screen.getByTestId("input")
    expect(userLocationInput).toBeInTheDocument()
    fireEvent.change(userLocationInput, { target: { value: "Moscow" } })
    expect(userLocationInput.value).toBe("Moscow")
  })
  it("should properly show search results", async () => {
    render(
      <UserMarkersProvider>
        <Form />
      </UserMarkersProvider>
    )
    let latLng
    const predictions = [
      {
        description: "data test 1",
        place_id: 123,
        structured_formatting: {
          main_text: "Moscow data",
        },
        position: latLng,
      },
    ]

    getPlacesDetails.mockImplementation(() =>
      Promise.resolve({
        lat: () => 39,
        lng: () => 39,
      })
    )

    await waitFor(() => useGoogleAutocomplete.mockReturnValueOnce(predictions))
    expect(useGoogleAutocomplete).toBeCalledTimes(1)
    const userLocationInput = screen.getByTestId("input")
    fireEvent.change(userLocationInput, { target: { value: "Moscow" } })
    expect(useGoogleAutocomplete).toBeCalledTimes(2)
    const testData = await screen.findByText("data test 1")
    expect(testData).toBeInTheDocument()
    const userSuggestions = screen.getByTestId("user_suggestions")
    expect(userSuggestions).toBeInTheDocument()
    expect(userSuggestions).toHaveTextContent("data test 1")
    fireEvent.click(userSuggestions)
    await waitFor(() => expect(getPlacesDetails).toHaveBeenCalledTimes(1))
    expect(userLocationInput).toHaveTextContent("")
  })
})

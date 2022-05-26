import React from "react"
import { render, waitFor } from "@testing-library/react"
import { useGoogleAutocomplete } from "../../helpers/useGoogleAutocomplete"
import { googleAutocompleteDeb } from "../../helpers/googleAutocompleteDeb"

jest.mock("../../helpers/googleAutocompleteDeb", () => ({
  googleAutocompleteDeb: jest.fn(),
}))

async function setup(...args) {
  const returnVal = []
  function TestComponent() {
    Object.assign(returnVal, useGoogleAutocomplete(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}

const data = [
  {
    description: "Moscow",
  },
  {
    description: "USA",
  },
]
test("should return proper value from hook", async () => {
  const dataFromUseAutocomplete = await setup("test", 0)
  expect(jest.isMockFunction(googleAutocompleteDeb)).toBeTruthy()
  googleAutocompleteDeb.mockResolvedValueOnce(data)
  await waitFor(() => new Promise((res) => setTimeout(res, 100)))
  expect(dataFromUseAutocomplete).toEqual(data)
})

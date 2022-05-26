import { render, screen } from "@testing-library/react"

import Card from "../../../components/Card/Card"
import { UserMarkersProvider } from "../../../context/userMarkers"

describe("Card component", () => {
  test("Should render Card component with text.length lower then 40 symbols", () => {
    const testEl = {
      description: "test",
    }
    render(
      <UserMarkersProvider>
        <Card el={testEl} />
      </UserMarkersProvider>
    )
    const cardText = screen.getByText("test")
    expect(cardText).toBeInTheDocument()
  })
  test("Should render Card component with text.length greater then 40 symbols", () => {
    const testEl = {
      description:
        'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе.',
    }
    render(
      <UserMarkersProvider>
        <Card el={testEl} />
      </UserMarkersProvider>
    )
    const cardText = screen.getByText(
      "Многие думают, что Lorem Ipsum - взят..."
    )
    expect(cardText).toBeInTheDocument()
  })
})

import { Loader } from "@googlemaps/js-api-loader"

export default function MapLoader() {
  let map
  let autocomplete
  const additionalOptions = {}

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS,
    version: "weekly",
    ...additionalOptions,
    libraries: ["places"],
  })
  console.log("render")

  const data = loader.load().then(() => {
    let google = window.google
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        types: ["establishment"],
        componentRestrictions: { country: ["RU"] },
        fields: ["name"],
      }
    )
  })
  return data
}

export const getPlacesDetails = async (place, map) => {
  const mapRef = map
  const request = {
    placeId: place.place_id,
    fields: ["name", "formatted_address", "place_id", "geometry"],
  }

  let data = new Promise((resolve, reject) => {
    try {
      new window.google.maps.places.PlacesService(mapRef).getDetails(
        request,
        (place) => resolve(place?.geometry?.location)
      )
    } catch (e) {
      console.log(e, "Ooops")
      reject(e)
    }
  })
  return data
}

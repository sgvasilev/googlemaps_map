export const getGeocode = async (input) => {
  const geocoder = new window.google.maps.Geocoder()
  try {
    // const result = await geocoder.geocode({ location: input })
    // const data = result.results[0].formatted_address
    const data = "Moved"
    return data
  } catch (error) {
    throw new Error("Невозможно найти выбраный Вами адресс")
  }
}

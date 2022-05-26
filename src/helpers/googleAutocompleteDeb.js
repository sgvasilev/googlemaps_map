export const googleAutocompleteDeb = async (searchText) => {
  const options = {
    input: searchText,
    fields: ["formatted_address", "name"],
    strictBounds: false,
    componentRestrictions: { country: ["RU"] },
    types: ["establishment"],
  }
  let data = new Promise((resolve, reject) => {
    if (!searchText) return reject("Поле ввода пусто")
    if (!window.google) return reject("Что то пошло не так...")
    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        options,
        (predictions) => resolve(predictions)
      )
    } catch (e) {
      reject(e)
    }
  })
  return data
}

const latLng = { lat: () => 39, lng: () => 39 }
const getPlacesDetails = () => {
  return new Promise((res, rej) => {
    process.nextTick(() => res(latLng))
  })
}
let data = getPlacesDetails()
data.then((res) => console.log(res.lat()))

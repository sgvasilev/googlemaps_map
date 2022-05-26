import { useState, useEffect, useContext } from "react"
import userMarkerContext from "../../context/userMarkers"
import { getGeocode } from "../../helpers/getGeocode"

const Marker = ({ position, map, description, id }) => {
  const [marker, setMarker] = useState()
  const { renewMarker } = useContext(userMarkerContext)
  useEffect(() => {
    if (!marker) {
      setMarker(
        new window.google.maps.Marker({
          draggable: true,
        })
      )
    }

    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])
  useEffect(() => {
    if (marker) {
      const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `${description}` +
        "</div>" +
        "</div>" +
        "</div>"
      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      })
      marker.setMap(map)
      marker.setPosition(position)
      marker.addListener("dragend", async (e) => {
        const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
        let newLocation = await getGeocode(latLng, map)
        if (typeof newLocation == Error) return
        renewMarker(id, latLng, newLocation)
      })
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: true,
        })
      })
      marker.addListener("drag", (mapsMouseEvent) => {
        const latLng = {
          lat: mapsMouseEvent.latLng.lat(),
          lng: mapsMouseEvent.latLng.lng(),
        }
        renewMarker(id, latLng)
      })

      return () => {
        if (marker) {
          window.google.maps.event.clearInstanceListeners(marker)
        }
      }
    }
  }, [marker, description, id, renewMarker, map, position])

  return null
}
export default Marker

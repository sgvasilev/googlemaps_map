import React, { useState, useEffect } from "react"
import { googleAutocompleteDeb } from "./googleAutocompleteDeb"

function useGoogleAutocomplete(text = "", debounce = 300) {
  const [predictions, setPredictions] = useState([])
  useEffect(() => {
    const handleDebounce = setTimeout(async () => {
      try {
        if (!text) return
        let data = await googleAutocompleteDeb(text)
        setPredictions(data)
      } catch (e) {
        return e
      }
    }, debounce)

    return () => clearTimeout(handleDebounce)
  }, [text, debounce])
  return predictions
}
export { useGoogleAutocomplete }

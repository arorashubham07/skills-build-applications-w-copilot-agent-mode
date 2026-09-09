import { useEffect, useState } from 'react'

function collectionFromResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['data', 'items', 'results']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  return []
}

export function useApiCollection(url, component) {
  const [state, setState] = useState({ data: [], error: null, loading: true })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Unable to load ${component} (${response.status})`)
        }

        const payload = await response.json()
        setState({ data: collectionFromResponse(payload), error: null, loading: false })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        const message = error instanceof Error ? error.message : `Unable to load ${component}`
        setState({ data: [], error: message, loading: false })
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [component, url])

  return state
}

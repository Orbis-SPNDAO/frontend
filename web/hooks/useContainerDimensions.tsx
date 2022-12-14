import { useCallback, useEffect, useState } from "react"

export const useContainerDimensions = (element: HTMLElement) => {
  const getDimensions = useCallback(
    () => ({
      width: element?.offsetWidth ?? 0,
      height: element?.offsetHeight ?? 0,
    }),
    [element]
  )

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (element) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [getDimensions, element])

  return dimensions
}

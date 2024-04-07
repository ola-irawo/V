import React, { useEffect, useState } from 'react'

const useWindowWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)

    }, [screenWidth])

  return {screenWidth}
}

export default useWindowWidth

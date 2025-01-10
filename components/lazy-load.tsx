"use client"

import { useEffect, useRef, useState } from "react"

import { ReactNode } from "react"

interface LazyLoadProps {
  children: ReactNode
  fallback: ReactNode
}

const LazyLoad = ({ children, fallback }: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return <div ref={containerRef}>{isVisible ? children : fallback}</div>
}

export default LazyLoad

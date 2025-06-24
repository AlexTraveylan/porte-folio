"use client"

import { useEffect, useMemo, useState } from "react"

interface GlitchConfig {
  text: string
  hiddenDigit: string
  glitchProbability?: number
  glitchDuration?: number
  glitchInterval?: number
}

interface GlitchCharacter {
  char: string
  isGlitching: boolean
  isGlitchChar: boolean
  originalChar: string
}

export function useGlitchText({
  text,
  hiddenDigit,
  glitchProbability = 0.3,
  glitchDuration = 500,
  glitchInterval = 1500,
}: GlitchConfig) {
  const [characters, setCharacters] = useState<GlitchCharacter[]>([])

  const initializeCharacters = useMemo(() => {
    if (!text) return []

    const chars = text.split("")
    const nonSpaceIndices = chars
      .map((char, index) => ({ char, index }))
      .filter(({ char }) => char !== " ")

    const glitchCharIndex =
      nonSpaceIndices.length > 0
        ? nonSpaceIndices[Math.floor(Math.random() * nonSpaceIndices.length)]
            .index
        : -1

    return chars.map((char, index) => ({
      char,
      isGlitching: false,
      isGlitchChar: index === glitchCharIndex,
      originalChar: char,
    }))
  }, [text])

  useEffect(() => {
    setCharacters(initializeCharacters)
  }, [initializeCharacters])

  useEffect(() => {
    if (characters.length === 0) return

    const interval = setInterval(() => {
      setCharacters((prevChars) => {
        return prevChars.map((charObj) => {
          if (
            charObj.isGlitchChar &&
            !charObj.isGlitching &&
            Math.random() < glitchProbability
          ) {
            setTimeout(() => {
              setCharacters((currentChars) =>
                currentChars.map((c) =>
                  c.isGlitchChar && c.isGlitching
                    ? { ...c, char: c.originalChar, isGlitching: false }
                    : c
                )
              )
            }, glitchDuration)

            return {
              ...charObj,
              char: hiddenDigit,
              isGlitching: true,
            }
          }
          return charObj
        })
      })
    }, glitchInterval)

    return () => clearInterval(interval)
  }, [
    characters.length,
    hiddenDigit,
    glitchProbability,
    glitchDuration,
    glitchInterval,
  ])

  const glitchText = (
    <>
      {characters.map((charObj, index) => (
        <span
          key={index}
          className={`${
            charObj.isGlitching ? "text-primary" : ""
          } transition-all`}
        >
          {charObj.char}
        </span>
      ))}
    </>
  )

  return glitchText
}

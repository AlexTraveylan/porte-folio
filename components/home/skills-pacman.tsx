"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { combinaison } from "@/lib/constants"
import { useGlitchText } from "@/lib/useGlitchText"
import { useScopedI18n } from "@/locales/client"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import Link from "next/link"
import React, { useCallback, useEffect, useRef, useState } from "react"

// Types for Pac-Man game
type Position = { x: number; y: number }
type Direction = "up" | "down" | "left" | "right"
type GameState = "start" | "playing" | "won" | "lost"

// Game constants
const GAME_SPEED = 200
const PACMAN_ANIMATION_SPEED = 300

// Skills list (Python is pre-collected)
const SKILLS = [
  { name: "TypeScript" },
  { name: "FastAPI" },
  { name: "Streamlit" },
  { name: "React" },
  { name: "Next.js" },
  { name: "SQL" },
  { name: "Snowflake" },
  { name: "Git" },
  { name: "Docker" },
  { name: "Kubernetes" },
  { name: "Kafka" },
  { name: "Pandas" },
  { name: "NumPy" },
  { name: "scikit-learn" },
  { name: "MyPy" },
  { name: "Ruff" },
  { name: "UV" },
  { name: "Pytest" },
  { name: "GitHub" },
  { name: "GitLab" },
  { name: "Jira" },
  { name: "Kanban" },
  { name: "Agile" },
  { name: "REST" },
  { name: "SOLID" },
  { name: "Clean Code" },
  { name: "Grafana" },
]

// Python is pre-collected as the core skill
const PYTHON_SKILL = { name: "Python" }

// Mobile-friendly Pac-Man maze (13x15 grid)
const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

const MAZE_WIDTH = 13
const MAZE_HEIGHT = 15

export default function SkillsPacMan() {
  const t = useScopedI18n("skills-pacman")
  const glitchTitle = useGlitchText({
    text: t("title"),
    hiddenDigit: combinaison[1],
  })

  // Game state
  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 6, y: 11 })
  const [pacmanDir, setPacmanDir] = useState<Direction>("right")
  const [ghosts, setGhosts] = useState<
    Array<{ pos: Position; dir: Direction; color: string }>
  >([
    { pos: { x: 6, y: 7 }, dir: "up", color: "bg-red-500" },
    { pos: { x: 5, y: 7 }, dir: "left", color: "bg-pink-500" },
  ])
  const [fruits, setFruits] = useState<
    Array<{ pos: Position; skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL }>
  >([])
  const [collectedSkills, setCollectedSkills] = useState<
    Array<(typeof SKILLS)[0] | typeof PYTHON_SKILL>
  >([PYTHON_SKILL])
  const [gameState, setGameState] = useState<GameState>("start")
  const [availableSkills, setAvailableSkills] =
    useState<Array<(typeof SKILLS)[0]>>(SKILLS)
  const [pacmanMouthOpen, setPacmanMouthOpen] = useState(true)
  const [collectedFruitAnimation, setCollectedFruitAnimation] = useState<
    Position | null
  >(null)

  const gameLoopRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const nextDirectionRef = useRef<Direction | null>(null)
  const gameStateRef = useRef<GameState>("start")
  const pacmanPosRef = useRef<Position>({ x: 6, y: 11 })
  const pacmanDirRef = useRef<Direction>("right")
  const ghostsRef = useRef<
    Array<{ pos: Position; dir: Direction; color: string }>
  >([
    { pos: { x: 6, y: 7 }, dir: "up", color: "bg-red-500" },
    { pos: { x: 5, y: 7 }, dir: "left", color: "bg-pink-500" },
  ])
  const fruitsRef = useRef<
    Array<{ pos: Position; skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL }>
  >([])
  const availableSkillsRef = useRef<Array<(typeof SKILLS)[0]>>(SKILLS)

  // Start the game
  const startGame = useCallback(() => {
    setGameState("playing")
    gameStateRef.current = "playing"
  }, [])

  // Change Pac-Man direction with queue system for better responsiveness
  const changePacmanDirection = useCallback(
    (direction: Direction) => {
      if (gameStateRef.current === "playing") {
        nextDirectionRef.current = direction
        setPacmanDir(direction)
        pacmanDirRef.current = direction
      }
    },
    []
  )

  // Initialize game
  const initializeGame = useCallback(() => {
    const initialPos = { x: 6, y: 11 }
    const initialDir = "right"
    const initialGhosts = [
      { pos: { x: 6, y: 7 }, dir: "up" as Direction, color: "bg-red-500" },
      { pos: { x: 5, y: 7 }, dir: "left" as Direction, color: "bg-pink-500" },
    ]

    setPacmanPos(initialPos)
    setPacmanDir(initialDir)
    setGhosts(initialGhosts)
    setCollectedSkills([PYTHON_SKILL])
    setAvailableSkills(SKILLS)
    setGameState("start")
    setFruits([])
    setCollectedFruitAnimation(null)
    setPacmanMouthOpen(true)

    pacmanPosRef.current = initialPos
    pacmanDirRef.current = initialDir
    ghostsRef.current = initialGhosts
    availableSkillsRef.current = SKILLS
    gameStateRef.current = "start"
    nextDirectionRef.current = null
    fruitsRef.current = []
  }, [])

  // Generate random fruits on empty spaces
  const generateFruits = useCallback(() => {
    if (availableSkills.length === 0) return []

    const emptySpaces: Position[] = []
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (MAZE[y][x] === 0) {
          emptySpaces.push({ x, y })
        }
      }
    }

    const newFruits: Array<{ pos: Position; skill: (typeof SKILLS)[0] }> = []
    const fruitsToGenerate = Math.min(5, availableSkills.length)

    // Add fruits randomly
    for (let i = 0; i < fruitsToGenerate; i++) {
      if (emptySpaces.length > 0 && availableSkills.length > 0) {
        const randomSpaceIndex = Math.floor(Math.random() * emptySpaces.length)
        const randomSpace = emptySpaces.splice(randomSpaceIndex, 1)[0]
        const randomSkillIndex = Math.floor(
          Math.random() * availableSkills.length
        )
        const skill = availableSkills[randomSkillIndex]

        newFruits.push({ pos: randomSpace, skill })
      }
    }

    return newFruits
  }, [availableSkills])

  // Check if position is valid (not a wall)
  const isValidPosition = useCallback((pos: Position) => {
    if (pos.x < 0 || pos.x >= MAZE_WIDTH || pos.y < 0 || pos.y >= MAZE_HEIGHT) {
      return false
    }
    return MAZE[pos.y][pos.x] === 0
  }, [])

  // Get next position based on direction
  const getNextPosition = useCallback(
    (pos: Position, dir: Direction): Position => {
      const next = { ...pos }
      switch (dir) {
        case "up":
          next.y -= 1
          break
        case "down":
          next.y += 1
          break
        case "left":
          next.x -= 1
          break
        case "right":
          next.x += 1
          break
      }
      return next
    },
    []
  )

  // Move Pac-Man
  const movePacman = useCallback(() => {
    const currentPos = pacmanPosRef.current
    let currentDir = pacmanDirRef.current

    // Try to apply queued direction if valid
    if (nextDirectionRef.current) {
      const queuedNextPos = getNextPosition(currentPos, nextDirectionRef.current)
      if (isValidPosition(queuedNextPos)) {
        currentDir = nextDirectionRef.current
        pacmanDirRef.current = currentDir
        nextDirectionRef.current = null
      }
    }

    const nextPos = getNextPosition(currentPos, currentDir)

    // Handle teleportation on row 7 (tunnel)
    let finalPos = nextPos
    if (currentPos.y === 7) {
      if (nextPos.x < 0) {
        finalPos = { x: MAZE_WIDTH - 1, y: 7 }
      } else if (nextPos.x >= MAZE_WIDTH) {
        finalPos = { x: 0, y: 7 }
      }
    }

    if (isValidPosition(finalPos)) {
      pacmanPosRef.current = finalPos
      setPacmanPos(finalPos)
      setPacmanDir(currentDir)

      // Check fruit collection
      const collectedFruit = fruitsRef.current.find(
        (fruit: { pos: Position; skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL }) =>
          fruit.pos.x === finalPos.x && fruit.pos.y === finalPos.y
      )

      if (collectedFruit) {
        setCollectedFruitAnimation(finalPos)
        setTimeout(() => setCollectedFruitAnimation(null), 300)

        fruitsRef.current = fruitsRef.current.filter(
          (fruit: { pos: Position; skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL }) =>
            !(fruit.pos.x === finalPos.x && fruit.pos.y === finalPos.y)
        )

        setFruits([...fruitsRef.current])

        setCollectedSkills((prevSkills: Array<(typeof SKILLS)[0] | typeof PYTHON_SKILL>) => {
          const isAlreadyCollected = prevSkills.some(
            (skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL) =>
              skill.name === collectedFruit.skill.name
          )
          if (!isAlreadyCollected) {
            return [...prevSkills, collectedFruit.skill]
          }
          return prevSkills
        })

        availableSkillsRef.current = availableSkillsRef.current.filter(
          (skill: (typeof SKILLS)[0]) => skill.name !== collectedFruit.skill.name
        )
        setAvailableSkills([...availableSkillsRef.current])
      }
    }
  }, [getNextPosition, isValidPosition])

  // Move ghosts with simple AI
  const moveGhosts = useCallback(() => {
    ghostsRef.current = ghostsRef.current.map((ghost: { pos: Position; dir: Direction; color: string }) => {
      const directions: Direction[] = ["up", "down", "left", "right"]
      const possibleMoves = directions.filter((dir) => {
        const nextPos = getNextPosition(ghost.pos, dir)
        return isValidPosition(nextPos)
      })

      if (possibleMoves.length === 0) return ghost

      const toPacman = {
        x: pacmanPosRef.current.x - ghost.pos.x,
        y: pacmanPosRef.current.y - ghost.pos.y,
      }

      let preferredDir: Direction | null = null
      if (Math.abs(toPacman.x) > Math.abs(toPacman.y)) {
        preferredDir = toPacman.x > 0 ? "right" : "left"
      } else {
        preferredDir = toPacman.y > 0 ? "down" : "up"
      }

      const finalDir = possibleMoves.includes(preferredDir)
        ? preferredDir
        : possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

      return {
        ...ghost,
        pos: getNextPosition(ghost.pos, finalDir),
        dir: finalDir,
      }
    })
    setGhosts([...ghostsRef.current])
  }, [getNextPosition, isValidPosition])

  // Check collisions
  const checkCollisions = useCallback(() => {
    const ghostCollision = ghostsRef.current.some(
      (ghost: { pos: Position; dir: Direction; color: string }) =>
        ghost.pos.x === pacmanPosRef.current.x &&
        ghost.pos.y === pacmanPosRef.current.y
    )

    if (ghostCollision) {
      gameStateRef.current = "lost"
      setGameState("lost")
      return
    }

    if (
      availableSkillsRef.current.length === 0 &&
      fruitsRef.current.length === 0
    ) {
      gameStateRef.current = "won"
      setGameState("won")
    }
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStateRef.current !== "playing") return

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault()
          changePacmanDirection("up")
          break
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault()
          changePacmanDirection("down")
          break
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          changePacmanDirection("left")
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          changePacmanDirection("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [changePacmanDirection])

  // Pac-Man mouth animation
  useEffect(() => {
    if (gameStateRef.current === "playing") {
      const mouthInterval = setInterval(() => {
        setPacmanMouthOpen((prev: boolean) => !prev)
      }, PACMAN_ANIMATION_SPEED)

      return () => clearInterval(mouthInterval)
    }
  }, [gameState])

  // Game loop with requestAnimationFrame for smooth performance
  useEffect(() => {
    if (gameState === "playing") {
      lastUpdateRef.current = performance.now()

      const gameLoop = (currentTime: number) => {
        if (gameStateRef.current !== "playing") {
          return
        }

        const deltaTime = currentTime - lastUpdateRef.current

        if (deltaTime >= GAME_SPEED) {
          movePacman()
          moveGhosts()
          checkCollisions()
          lastUpdateRef.current = currentTime
        }

        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop)

      return () => {
        if (gameLoopRef.current !== null) {
          cancelAnimationFrame(gameLoopRef.current)
        }
      }
    }
  }, [gameState, movePacman, moveGhosts, checkCollisions])

  // Add a single fruit when one is collected
  const addSingleFruit = useCallback(() => {
    if (availableSkillsRef.current.length === 0) return

    const emptySpaces: Position[] = []
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (MAZE[y][x] === 0) {
          const isOccupied = fruitsRef.current.some(
            (fruit: { pos: Position; skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL }) =>
              fruit.pos.x === x && fruit.pos.y === y
          )
          if (!isOccupied) {
            emptySpaces.push({ x, y })
          }
        }
      }
    }

    if (emptySpaces.length > 0) {
      const randomSpaceIndex = Math.floor(Math.random() * emptySpaces.length)
      const randomSpace = emptySpaces[randomSpaceIndex]
      const randomSkillIndex = Math.floor(
        Math.random() * availableSkillsRef.current.length
      )
      const skill = availableSkillsRef.current[randomSkillIndex]

      fruitsRef.current = [...fruitsRef.current, { pos: randomSpace, skill }]
      setFruits([...fruitsRef.current])
    }
  }, [])

  // Initialize fruits when game starts
  useEffect(() => {
    if (
      gameState === "playing" &&
      fruitsRef.current.length === 0 &&
      availableSkillsRef.current.length > 0
    ) {
      const newFruits = generateFruits()
      fruitsRef.current = newFruits
      setFruits(newFruits)
    }
  }, [gameState, generateFruits])

  // Add single fruit when one is collected (maintain 5 fruits)
  useEffect(() => {
    if (
      gameState === "playing" &&
      fruitsRef.current.length < 5 &&
      fruitsRef.current.length > 0 &&
      availableSkillsRef.current.length > 0
    ) {
      addSingleFruit()
    }
  }, [gameState, fruits.length, addSingleFruit])

  // Start game on component mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // Stable cell rendering to prevent flickering
  const getCellContent = useCallback(
    (x: number, y: number): React.ReactElement | null => {
      // Pac-Man
      if (pacmanPos.x === x && pacmanPos.y === y) {
        const rotationClassesMap: Record<Direction, string> = {
          right: "rotate-0",
          down: "rotate-90",
          left: "rotate-180",
          up: "-rotate-90",
        }
        const rotationClasses = rotationClassesMap[pacmanDir] || "rotate-0"
        const pacmanMouth = pacmanMouthOpen ? "◐" : "●"

        return (
          <div
            key="pacman"
            className={`text-yellow-400 text-2xl font-bold ${rotationClasses} transform inline-block will-change-transform drop-shadow-sm`}
            style={{
              transition: "transform 0.1s ease-out",
              filter: "drop-shadow(0 0 2px rgba(250, 204, 21, 0.5))",
            }}
          >
            {pacmanMouth}
          </div>
        )
      }

      // Ghosts
      const ghost = ghosts.find(
        (g: { pos: Position; dir: Direction; color: string }) =>
          g.pos.x === x && g.pos.y === y
      )
      if (ghost) {
        return (
          <div
            key={`ghost-${ghost.pos.x}-${ghost.pos.y}`}
            className={`w-5 h-5 rounded-t-full ${ghost.color} will-change-transform shadow-sm`}
            style={{
              transition: "transform 0.15s ease-out",
              animation: "ghost-float 2s ease-in-out infinite",
            }}
          ></div>
        )
      }

      // Fruits
      const fruit = fruits.find(
        (f: { pos: Position; skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL }) =>
          f.pos.x === x && f.pos.y === y
      )
      if (fruit) {
        const isAnimating =
          collectedFruitAnimation?.x === fruit.pos.x &&
          collectedFruitAnimation?.y === fruit.pos.y
        return (
          <div
            key={`fruit-${fruit.pos.x}-${fruit.pos.y}`}
            className={`text-red-500 text-lg will-change-transform ${isAnimating ? "scale-150 opacity-0" : "scale-100 opacity-100"
              }`}
            style={{
              transition: isAnimating
                ? "transform 0.3s ease-out, opacity 0.3s ease-out"
                : "none",
              filter: isAnimating
                ? "none"
                : "drop-shadow(0 0 2px rgba(239, 68, 68, 0.3))",
            }}
          >
            🍎
          </div>
        )
      }

      return null
    },
    [
      pacmanPos,
      pacmanDir,
      pacmanMouthOpen,
      ghosts,
      fruits,
      collectedFruitAnimation,
    ]
  )

  const renderCell = useCallback(
    (x: number, y: number) => {
      const content = getCellContent(x, y)

      if (content) {
        return content
      }

      // Wall or empty space
      if (MAZE[y][x] === 1) {
        return (
          <div
            key={`wall-${x}-${y}`}
            className="w-full h-full bg-primary"
          ></div>
        )
      }

      return null
    },
    [getCellContent]
  )

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-semibold">{glitchTitle}</h2>

      {/* Game board */}
      <div className="flex justify-center">
        <div className="relative">
          <div
            className="grid gap-0.5 bg-card p-3 sm:p-2 border-2 border-border rounded-lg shadow-lg select-none"
            style={{
              gridTemplateColumns: `repeat(${MAZE_WIDTH}, 1fr)`,
              gridTemplateRows: `repeat(${MAZE_HEIGHT}, 1fr)`,
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {Array(MAZE_HEIGHT * MAZE_WIDTH)
              .fill(null)
              .map((_, index) => {
                const x = index % MAZE_WIDTH
                const y = Math.floor(index / MAZE_WIDTH)
                return (
                  <div
                    key={`cell-${x}-${y}`}
                    className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center bg-background"
                  >
                    {renderCell(x, y)}
                  </div>
                )
              })}
          </div>

          {/* Start Screen Overlay */}
          {gameState === "start" && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 text-center space-y-4">
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {t("startMessage")}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("startDescription")}
                </p>
                <Button onClick={startGame} size="lg" className="w-full">
                  {t("startGame")}
                </Button>
              </div>
            </div>
          )}

          {/* Game Over Overlay */}
          {(gameState === "won" || gameState === "lost") && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 text-center space-y-4">
                {/* Game result */}
                {gameState === "won" && (
                  <>
                    <h3 className="text-3xl font-bold text-primary mb-4">
                      {t("congratulations")}
                    </h3>
                    <p className="text-lg text-card-foreground">
                      {t("allSkillsCollected")}
                    </p>
                  </>
                )}

                {gameState === "lost" && (
                  <>
                    <h3 className="text-2xl font-bold text-destructive mb-4">
                      {t("gameOver")}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {t("impressedBySkills")}
                    </p>
                  </>
                )}

                {/* Collected skills */}
                {(collectedSkills.length > 0 || gameState === "lost") && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">{t("collected")}</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {collectedSkills.map((skill: (typeof SKILLS)[0] | typeof PYTHON_SKILL, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                      {gameState === "lost" && availableSkills.length > 0 && (
                        <Badge variant="secondary">
                          +{availableSkills.length} {t("missing")}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 justify-center pt-4">
                  <Button onClick={initializeGame} variant="outline">
                    {t("playAgain")}
                  </Button>
                  <Link href="/contact">
                    <Button>{t("contact")}</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Controls */}
      {gameState === "playing" && (
        <div className="flex justify-center md:hidden">
          <div className="grid grid-cols-3 gap-2 w-32">
            {/* Top row */}
            <div></div>
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0 touch-manipulation active:scale-95 transition-transform"
              onClick={() => changePacmanDirection("up")}
              onTouchStart={(e) => {
                e.preventDefault()
                changePacmanDirection("up")
              }}
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
            <div></div>

            {/* Middle row */}
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0 touch-manipulation active:scale-95 transition-transform"
              onClick={() => changePacmanDirection("left")}
              onTouchStart={(e) => {
                e.preventDefault()
                changePacmanDirection("left")
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div></div>
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0 touch-manipulation active:scale-95 transition-transform"
              onClick={() => changePacmanDirection("right")}
              onTouchStart={(e) => {
                e.preventDefault()
                changePacmanDirection("right")
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Bottom row */}
            <div></div>
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0 touch-manipulation active:scale-95 transition-transform"
              onClick={() => changePacmanDirection("down")}
              onTouchStart={(e) => {
                e.preventDefault()
                changePacmanDirection("down")
              }}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
            <div></div>
          </div>
        </div>
      )}

      {/* Instructions for desktop */}
      {gameState === "playing" && (
        <div className="hidden md:block text-center text-sm text-muted-foreground">
          Use arrow keys or WASD to move
        </div>
      )}
    </div>
  )
}

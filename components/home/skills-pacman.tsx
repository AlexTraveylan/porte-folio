"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { combinaison } from "@/lib/constants"
import { useGlitchText } from "@/lib/useGlitchText"
import { useScopedI18n } from "@/locales/client"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

// Types for Pac-Man game
type Position = { x: number; y: number }
type Direction = "up" | "down" | "left" | "right"
type GameState = "start" | "playing" | "won" | "lost"

// Skills list (Python is pre-collected)
const SKILLS = [
  { name: "TypeScript" },
  { name: "FastAPI" },
  { name: "Django" },
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
    hiddenDigit: combinaison[2],
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

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  // Start the game
  const startGame = useCallback(() => {
    setGameState("playing")
  }, [])

  // Change Pac-Man direction
  const changePacmanDirection = useCallback(
    (direction: Direction) => {
      if (gameState === "playing") {
        setPacmanDir(direction)
      }
    },
    [gameState]
  )

  // Initialize game
  const initializeGame = useCallback(() => {
    setPacmanPos({ x: 6, y: 11 })
    setPacmanDir("right")
    setGhosts([
      { pos: { x: 6, y: 7 }, dir: "up", color: "bg-red-500" },
      { pos: { x: 5, y: 7 }, dir: "left", color: "bg-pink-500" },
    ])
    setCollectedSkills([PYTHON_SKILL])
    setAvailableSkills(SKILLS)
    setGameState("start")
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
    const nextPos = getNextPosition(pacmanPos, pacmanDir)

    // Handle teleportation on row 7 (tunnel)
    let finalPos = nextPos
    if (pacmanPos.y === 7) {
      // Row with tunnel
      if (nextPos.x < 0) {
        // Teleport from left to right
        finalPos = { x: MAZE_WIDTH - 1, y: 7 }
      } else if (nextPos.x >= MAZE_WIDTH) {
        // Teleport from right to left
        finalPos = { x: 0, y: 7 }
      }
    }

    if (isValidPosition(finalPos)) {
      setPacmanPos(finalPos)

      // Check fruit collection
      setFruits((prev) => {
        const remainingFruits = prev.filter(
          (fruit) => !(fruit.pos.x === finalPos.x && fruit.pos.y === finalPos.y)
        )

        const collectedFruit = prev.find(
          (fruit) => fruit.pos.x === finalPos.x && fruit.pos.y === finalPos.y
        )

        if (collectedFruit) {
          setCollectedSkills((prevSkills) => {
            // Check if skill is already collected to avoid duplicates
            const isAlreadyCollected = prevSkills.some(
              (skill) => skill.name === collectedFruit.skill.name
            )
            if (!isAlreadyCollected) {
              return [...prevSkills, collectedFruit.skill]
            }
            return prevSkills
          })
          setAvailableSkills((prevAvailable) =>
            prevAvailable.filter(
              (skill) => skill.name !== collectedFruit.skill.name
            )
          )
        }

        return remainingFruits
      })
    }
  }, [pacmanPos, pacmanDir, getNextPosition, isValidPosition])

  // Move ghosts with simple AI
  const moveGhosts = useCallback(() => {
    setGhosts((prev) =>
      prev.map((ghost) => {
        const directions: Direction[] = ["up", "down", "left", "right"]
        const possibleMoves = directions.filter((dir) => {
          const nextPos = getNextPosition(ghost.pos, dir)
          return isValidPosition(nextPos)
        })

        if (possibleMoves.length === 0) return ghost

        // Simple AI: try to move towards Pac-Man, otherwise random
        const toPacman = {
          x: pacmanPos.x - ghost.pos.x,
          y: pacmanPos.y - ghost.pos.y,
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
    )
  }, [pacmanPos, getNextPosition, isValidPosition])

  // Check collisions
  const checkCollisions = useCallback(() => {
    const ghostCollision = ghosts.some(
      (ghost) => ghost.pos.x === pacmanPos.x && ghost.pos.y === pacmanPos.y
    )

    if (ghostCollision) {
      setGameState("lost")
      return
    }

    if (availableSkills.length === 0 && fruits.length === 0) {
      setGameState("won")
    }
  }, [ghosts, pacmanPos, availableSkills.length, fruits.length])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "playing") return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          setPacmanDir("up")
          break
        case "ArrowDown":
          e.preventDefault()
          setPacmanDir("down")
          break
        case "ArrowLeft":
          e.preventDefault()
          setPacmanDir("left")
          break
        case "ArrowRight":
          e.preventDefault()
          setPacmanDir("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState])

  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(() => {
        movePacman()
        moveGhosts()
        checkCollisions()
      }, 200)

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current)
        }
      }
    }
  }, [gameState, movePacman, moveGhosts, checkCollisions])

  // Add a single fruit when one is collected
  const addSingleFruit = useCallback(() => {
    if (availableSkills.length === 0) return

    const emptySpaces: Position[] = []
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (MAZE[y][x] === 0) {
          // Check if position is not occupied by existing fruits
          const isOccupied = fruits.some(
            (fruit) => fruit.pos.x === x && fruit.pos.y === y
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
        Math.random() * availableSkills.length
      )
      const skill = availableSkills[randomSkillIndex]

      setFruits((prev) => [...prev, { pos: randomSpace, skill }])
    }
  }, [availableSkills, fruits])

  // Initialize fruits when game starts
  useEffect(() => {
    if (
      gameState === "playing" &&
      fruits.length === 0 &&
      availableSkills.length > 0
    ) {
      const newFruits = generateFruits()
      setFruits(newFruits)
    }
  }, [gameState, fruits.length, availableSkills.length, generateFruits])

  // Add single fruit when one is collected (maintain 5 fruits)
  useEffect(() => {
    if (
      gameState === "playing" &&
      fruits.length < 5 &&
      fruits.length > 0 && // Only if we already have fruits (not initial load)
      availableSkills.length > 0
    ) {
      addSingleFruit()
    }
  }, [gameState, fruits.length, availableSkills.length, addSingleFruit])

  // Start game on component mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const renderCell = (x: number, y: number) => {
    // Check for Pac-Man
    if (pacmanPos.x === x && pacmanPos.y === y) {
      const rotation = {
        right: "rotate-0",
        down: "rotate-90",
        left: "rotate-180",
        up: "rotate-270",
      }[pacmanDir]
      return (
        <div
          className={`text-yellow-500 text-xl font-bold ${rotation} transform`}
        >
          ●
        </div>
      )
    }

    // Check for ghosts
    const ghost = ghosts.find((g) => g.pos.x === x && g.pos.y === y)
    if (ghost) {
      return <div className={`w-5 h-5 rounded-t-full ${ghost.color}`}></div>
    }

    // Check for fruits
    const fruit = fruits.find((f) => f.pos.x === x && f.pos.y === y)
    if (fruit) {
      return <div className="text-red-500 text-base">🍎</div>
    }

    // Wall or empty space
    if (MAZE[y][x] === 1) {
      return <div className="w-full h-full bg-primary"></div>
    }

    return null
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-semibold">{glitchTitle}</h2>

      {/* Game board */}
      <div className="flex justify-center">
        <div className="relative">
          <div
            className="grid gap-px bg-card p-2 border-2 border-border rounded-lg shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${MAZE_WIDTH}, 1fr)`,
              gridTemplateRows: `repeat(${MAZE_HEIGHT}, 1fr)`,
            }}
          >
            {Array(MAZE_HEIGHT * MAZE_WIDTH)
              .fill(null)
              .map((_, index) => {
                const x = index % MAZE_WIDTH
                const y = Math.floor(index / MAZE_WIDTH)
                return (
                  <div
                    key={index}
                    className="w-6 h-6 flex items-center justify-center bg-background"
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
                    <h4 className="text-lg font-semibold text-primary">
                      {t("collected")}
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {collectedSkills.map((skill, index) => (
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
              className="h-12 w-12 p-0"
              onClick={() => changePacmanDirection("up")}
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
            <div></div>

            {/* Middle row */}
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0"
              onClick={() => changePacmanDirection("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div></div>
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0"
              onClick={() => changePacmanDirection("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Bottom row */}
            <div></div>
            <Button
              variant="outline"
              size="sm"
              className="h-12 w-12 p-0"
              onClick={() => changePacmanDirection("down")}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}

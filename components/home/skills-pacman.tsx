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

type Skill = { name: string }
type Mover = { x: number; y: number; dir: Direction; p: number; moving: boolean }
type Ghost = Mover & { color: string }
type Fruit = { x: number; y: number; skill: Skill }
type Popup = { x: number; y: number; text: string; born: number }
type Colors = { background: string; wall: string; text: string }

// Game constants (speeds in tiles per second)
const PACMAN_SPEED = 6
const GHOST_SPEED = 4.8
const GHOST_START_DELAY = 0.8
const MAX_FRUITS = 5
const CELL = 28
const HIT_DISTANCE = 0.6
const POPUP_DURATION = 800
const TUNNEL_ROW = 7

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
  { name: "Claude Code" },
  { name: "Agents IA" },
  { name: "MCP" },
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

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"]
const VECTORS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}
const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}
const ANGLES: Record<Direction, number> = {
  right: 0,
  down: Math.PI / 2,
  left: Math.PI,
  up: -Math.PI / 2,
}

const GHOST_COLORS = ["#ef4444", "#ec4899"]

// Next tile in a direction, or null if blocked. Only Pac-Man can use the tunnel.
function nextTile(
  x: number,
  y: number,
  dir: Direction,
  canWrap: boolean
): Position | null {
  let nx = x + VECTORS[dir].x
  const ny = y + VECTORS[dir].y
  if (canWrap && y === TUNNEL_ROW) {
    if (nx < 0) nx = MAZE_WIDTH - 1
    else if (nx >= MAZE_WIDTH) nx = 0
  }
  if (nx < 0 || nx >= MAZE_WIDTH || ny < 0 || ny >= MAZE_HEIGHT) return null
  return MAZE[ny][nx] === 0 ? { x: nx, y: ny } : null
}

function createGame() {
  return {
    status: "start" as GameState,
    pacman: { x: 6, y: 11, dir: "right", p: 0, moving: false } as Mover,
    queued: null as Direction | null,
    ghosts: [
      { x: 6, y: 7, dir: "up", p: 0, moving: false, color: GHOST_COLORS[0] },
      { x: 5, y: 7, dir: "left", p: 0, moving: false, color: GHOST_COLORS[1] },
    ] as Ghost[],
    fruits: [] as Fruit[],
    remaining: [...SKILLS] as Skill[],
    popups: [] as Popup[],
    elapsed: 0,
  }
}

type Game = ReturnType<typeof createGame>

// Visual (interpolated) position of an entity in tile units
function visualPos(m: Mover): Position {
  const v = VECTORS[m.dir]
  return m.moving ? { x: m.x + v.x * m.p, y: m.y + v.y * m.p } : { x: m.x, y: m.y }
}

function spawnFruit(g: Game) {
  const onBoard = new Set(g.fruits.map((f) => f.skill.name))
  const candidates = g.remaining.filter((s) => !onBoard.has(s.name))
  if (candidates.length === 0) return

  const empty: Position[] = []
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      if (
        MAZE[y][x] === 0 &&
        !(x === g.pacman.x && y === g.pacman.y) &&
        !g.fruits.some((f) => f.x === x && f.y === y)
      ) {
        empty.push({ x, y })
      }
    }
  }
  if (empty.length === 0) return

  const spot = empty[Math.floor(Math.random() * empty.length)]
  const skill = candidates[Math.floor(Math.random() * candidates.length)]
  g.fruits.push({ ...spot, skill })
}

function pickGhostDir(ghost: Ghost, target: Position): Direction | null {
  let possible = DIRECTIONS.filter((d) => nextTile(ghost.x, ghost.y, d, false))
  if (possible.length === 0) return null

  // Avoid U-turns unless it's a dead end
  const withoutReverse = possible.filter((d) => d !== OPPOSITE[ghost.dir])
  if (withoutReverse.length > 0) possible = withoutReverse

  const dx = target.x - ghost.x
  const dy = target.y - ghost.y
  const preferred: Direction =
    Math.abs(dx) > Math.abs(dy)
      ? dx > 0 ? "right" : "left"
      : dy > 0 ? "down" : "up"

  return possible.includes(preferred)
    ? preferred
    : possible[Math.floor(Math.random() * possible.length)]
}

function DirButton({
  dir,
  onPress,
  icon: Icon,
}: {
  dir: Direction
  onPress: (dir: Direction) => void
  icon: typeof ChevronUp
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-12 w-12 p-0 touch-manipulation active:scale-95 transition-transform"
      onPointerDown={(e) => {
        e.preventDefault()
        onPress(dir)
      }}
    >
      <Icon className="h-6 w-6" />
    </Button>
  )
}

export default function SkillsPacMan() {
  const t = useScopedI18n("skills-pacman")
  const glitchTitle = useGlitchText({
    text: t("title"),
    hiddenDigit: combinaison[1],
  })

  // React state only holds what the UI around the canvas needs
  const [gameState, setGameState] = useState<GameState>("start")
  const [collectedSkills, setCollectedSkills] = useState<Skill[]>([
    PYTHON_SKILL,
  ])
  const [visible, setVisible] = useState(true)

  // Everything that changes every frame lives in refs
  const gameRef = useRef<Game>(createGame())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const probeBgRef = useRef<HTMLSpanElement>(null)
  const probeWallRef = useRef<HTMLSpanElement>(null)
  const probeTextRef = useRef<HTMLSpanElement>(null)
  const colorsRef = useRef<Colors>({
    background: "#000",
    wall: "#3b82f6",
    text: "#fff",
  })

  const readColors = useCallback(() => {
    if (!probeBgRef.current || !probeWallRef.current || !probeTextRef.current) {
      return
    }
    colorsRef.current = {
      background: getComputedStyle(probeBgRef.current).backgroundColor,
      wall: getComputedStyle(probeWallRef.current).backgroundColor,
      text: getComputedStyle(probeTextRef.current).color,
    }
  }, [])

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const g = gameRef.current
    const colors = colorsRef.current
    const dpr = canvas.width / (MAZE_WIDTH * CELL)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, MAZE_WIDTH * CELL, MAZE_HEIGHT * CELL)

    // Walls
    ctx.fillStyle = colors.wall
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (MAZE[y][x] === 1) {
          ctx.beginPath()
          ctx.roundRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2, 4)
          ctx.fill()
        }
      }
    }

    // Fruits
    ctx.font = `${CELL * 0.7}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    g.fruits.forEach((fruit, i) => {
      const scale = 1 + 0.08 * Math.sin(now / 200 + i)
      ctx.save()
      ctx.translate((fruit.x + 0.5) * CELL, (fruit.y + 0.5) * CELL)
      ctx.scale(scale, scale)
      ctx.fillText("🍎", 0, 0)
      ctx.restore()
    })

    // Ghosts
    g.ghosts.forEach((ghost) => {
      const pos = visualPos(ghost)
      const cx = (pos.x + 0.5) * CELL
      const cy = (pos.y + 0.5) * CELL
      const r = CELL * 0.38
      const wave = Math.sin(now / 120) * 1.5

      ctx.fillStyle = ghost.color
      ctx.beginPath()
      ctx.arc(cx, cy - 1, r, Math.PI, 0)
      ctx.lineTo(cx + r, cy + r)
      for (let i = 0; i < 3; i++) {
        const w = (r * 2) / 3
        const x0 = cx + r - i * w
        ctx.quadraticCurveTo(x0 - w / 2, cy + r - 4 + (i % 2 ? -wave : wave), x0 - w, cy + r)
      }
      ctx.closePath()
      ctx.fill()

      const v = VECTORS[ghost.dir]
      ctx.fillStyle = "#fff"
      for (const ex of [-r * 0.4, r * 0.4]) {
        ctx.beginPath()
        ctx.arc(cx + ex, cy - 3, 3.2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = "#1e3a8a"
      for (const ex of [-r * 0.4, r * 0.4]) {
        ctx.beginPath()
        ctx.arc(cx + ex + v.x * 1.5, cy - 3 + v.y * 1.5, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Pac-Man
    const pm = g.pacman
    const pos = visualPos(pm)
    const mouth = pm.moving
      ? Math.PI * (0.04 + 0.2 * (0.5 + 0.5 * Math.sin(now / 70)))
      : Math.PI * 0.12
    ctx.save()
    ctx.translate((pos.x + 0.5) * CELL, (pos.y + 0.5) * CELL)
    ctx.rotate(ANGLES[pm.dir])
    ctx.fillStyle = "#facc15"
    ctx.shadowColor = "rgba(250, 204, 21, 0.5)"
    ctx.shadowBlur = 4
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, CELL * 0.4, mouth, Math.PI * 2 - mouth)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // Collected skill popups
    g.popups = g.popups.filter((p) => now - p.born < POPUP_DURATION)
    ctx.font = "bold 12px sans-serif"
    ctx.lineWidth = 3
    ctx.strokeStyle = colors.background
    ctx.fillStyle = colors.text
    for (const p of g.popups) {
      const k = (now - p.born) / POPUP_DURATION
      const x = Math.min(Math.max(p.x * CELL + CELL / 2, 30), MAZE_WIDTH * CELL - 30)
      const y = p.y * CELL - k * CELL
      ctx.globalAlpha = 1 - k
      ctx.strokeText(p.text, x, y)
      ctx.fillText(p.text, x, y)
    }
    ctx.globalAlpha = 1
  }, [])

  const resetGame = useCallback(() => {
    gameRef.current = createGame()
    setCollectedSkills([PYTHON_SKILL])
    setGameState("start")
  }, [])

  const startGame = useCallback(() => {
    const g = gameRef.current
    g.fruits = []
    for (let i = 0; i < Math.min(MAX_FRUITS, g.remaining.length); i++) {
      spawnFruit(g)
    }
    g.status = "playing"
    setGameState("playing")
  }, [])

  const changePacmanDirection = useCallback((direction: Direction) => {
    const g = gameRef.current
    if (g.status === "playing") g.queued = direction
  }, [])

  // Advance the simulation by dt seconds
  const update = useCallback(
    (dt: number, now: number) => {
      const g = gameRef.current
      g.elapsed += dt

      // Pac-Man
      const pm = g.pacman
      let budget = PACMAN_SPEED * dt
      // Reversing mid-tile is instant: swap the tile we're heading to
      if (pm.moving && g.queued === OPPOSITE[pm.dir]) {
        const target = nextTile(pm.x, pm.y, pm.dir, true)
        if (target) {
          pm.x = target.x
          pm.y = target.y
          pm.dir = g.queued
          pm.p = 1 - pm.p
          g.queued = null
        }
      }
      while (budget > 0) {
        if (!pm.moving) {
          const dir =
            g.queued && nextTile(pm.x, pm.y, g.queued, true) ? g.queued : pm.dir
          if (!nextTile(pm.x, pm.y, dir, true)) break
          if (dir === g.queued) g.queued = null
          pm.dir = dir
          pm.moving = true
          pm.p = 0
        }
        const need = 1 - pm.p
        if (budget < need) {
          pm.p += budget
          break
        }
        budget -= need
        const target = nextTile(pm.x, pm.y, pm.dir, true)
        if (target) {
          pm.x = target.x
          pm.y = target.y
        }
        pm.p = 0
        pm.moving = false

        const eaten = g.fruits.findIndex((f) => f.x === pm.x && f.y === pm.y)
        if (eaten !== -1) {
          const { skill } = g.fruits[eaten]
          g.fruits.splice(eaten, 1)
          g.remaining = g.remaining.filter((s) => s.name !== skill.name)
          g.popups.push({ x: pm.x, y: pm.y, text: skill.name, born: now })
          setCollectedSkills((prev) =>
            prev.some((s) => s.name === skill.name) ? prev : [...prev, skill]
          )
          if (g.fruits.length < MAX_FRUITS) spawnFruit(g)
        }
      }

      // Ghosts (they wait a moment so the player can get oriented)
      if (g.elapsed > GHOST_START_DELAY) {
        const target = { x: pm.x, y: pm.y }
        for (const ghost of g.ghosts) {
          let gBudget = GHOST_SPEED * dt
          while (gBudget > 0) {
            if (!ghost.moving) {
              const dir = pickGhostDir(ghost, target)
              if (!dir) break
              ghost.dir = dir
              ghost.moving = true
              ghost.p = 0
            }
            const need = 1 - ghost.p
            if (gBudget < need) {
              ghost.p += gBudget
              break
            }
            gBudget -= need
            const next = nextTile(ghost.x, ghost.y, ghost.dir, false)
            if (next) {
              ghost.x = next.x
              ghost.y = next.y
            }
            ghost.p = 0
            ghost.moving = false
          }
        }
      }

      // Collisions
      const pv = visualPos(pm)
      const caught = g.ghosts.some((ghost) => {
        const gv = visualPos(ghost)
        return Math.hypot(gv.x - pv.x, gv.y - pv.y) < HIT_DISTANCE
      })
      if (caught) {
        g.status = "lost"
        setGameState("lost")
      } else if (g.remaining.length === 0 && g.fruits.length === 0) {
        g.status = "won"
        setGameState("won")
      }
    },
    []
  )

  // Keyboard controls
  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: "up",
      w: "up",
      W: "up",
      ArrowDown: "down",
      s: "down",
      S: "down",
      ArrowLeft: "left",
      a: "left",
      A: "left",
      ArrowRight: "right",
      d: "right",
      D: "right",
    }
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameRef.current.status !== "playing") return
      const dir = keyMap[e.key]
      if (!dir) return
      e.preventDefault()
      changePacmanDirection(dir)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [changePacmanDirection])

  // Canvas sizing (crisp on high-DPI screens) and theme colors
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = MAZE_WIDTH * CELL * dpr
      canvas.height = MAZE_HEIGHT * CELL * dpr
    }
    readColors()
    draw(performance.now())

    const observer = new MutationObserver(() => {
      readColors()
      draw(performance.now())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    })
    return () => observer.disconnect()
  }, [readColors, draw])

  // Only simulate while the board is on screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Game loop: fixed logic speed independent of the refresh rate
  useEffect(() => {
    if (gameState !== "playing" || !visible) {
      draw(performance.now())
      return
    }

    let raf = 0
    let last = performance.now()

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      update(dt, now)
      draw(now)
      if (gameRef.current.status === "playing") {
        raf = requestAnimationFrame(frame)
      }
    }
    raf = requestAnimationFrame(frame)

    return () => cancelAnimationFrame(raf)
  }, [gameState, visible, update, draw])

  const missingCount = SKILLS.length - (collectedSkills.length - 1)

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-semibold">{glitchTitle}</h2>

      {/* Game board */}
      <div className="flex justify-center">
        <div className="relative" ref={containerRef}>
          <div
            className="bg-card p-3 sm:p-2 border-2 border-border rounded-lg shadow-lg select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            <canvas
              ref={canvasRef}
              className="block w-full max-w-[364px] sm:max-w-[338px] rounded-sm"
              style={{ aspectRatio: `${MAZE_WIDTH} / ${MAZE_HEIGHT}` }}
            />
          </div>

          {/* Theme color probes read by the canvas renderer */}
          <span ref={probeBgRef} className="hidden bg-background" />
          <span ref={probeWallRef} className="hidden bg-primary" />
          <span ref={probeTextRef} className="hidden text-foreground" />

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
                      {collectedSkills.map((skill) => (
                        <Badge key={skill.name} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                      {gameState === "lost" && missingCount > 0 && (
                        <Badge variant="secondary">
                          +{missingCount} {t("missing")}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 justify-center pt-4">
                  <Button onClick={resetGame} variant="outline">
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
            <div></div>
            <DirButton dir="up" onPress={changePacmanDirection} icon={ChevronUp} />
            <div></div>
            <DirButton dir="left" onPress={changePacmanDirection} icon={ChevronLeft} />
            <div></div>
            <DirButton dir="right" onPress={changePacmanDirection} icon={ChevronRight} />
            <div></div>
            <DirButton dir="down" onPress={changePacmanDirection} icon={ChevronDown} />
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

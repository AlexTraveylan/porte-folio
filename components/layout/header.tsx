"use client"

import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "../ui/button"

const Header = () => {
  const { theme, setTheme } = useTheme()
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLang = () => {
    const newLang = currentLocale === "fr" ? "en" : "fr"
    changeLocale(newLang)
  }

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-background">
      <Link href="/" className="text-2xl font-bold text-foreground">
        AlexTravelan
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {["Accueil", "Projets", "À propos", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={
                  item === "Accueil"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="text-muted-foreground hover:text-foreground"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="rounded-full"
          aria-label="Basculer le thème"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </Button>
        <Button
          onClick={toggleLang}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          {currentLocale === "fr" ? "🇫🇷" : "🇬🇧"}
        </Button>
      </div>
    </header>
  )
}

export default Header

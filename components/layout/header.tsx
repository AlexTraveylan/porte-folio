"use client"

import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"

const Header = () => {
  const { theme, setTheme } = useTheme()
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLang = () => {
    const newLang = currentLocale === "fr" ? "en" : "fr"
    changeLocale(newLang)
  }

  return (
    <header className="relative flex justify-between items-center py-4 px-6 bg-background">
      <Link href="/" className="text-2xl font-bold text-foreground">
        AlexTravelan
      </Link>

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
        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <nav
        className={`absolute top-full left-0 right-0 bg-background md:bg-transparent md:static ${
          isMenuOpen ? "block" : "hidden"
        } md:block mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
          {["Accueil", "Projets", "À propos", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={
                  item === "Accueil"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="text-muted-foreground hover:text-foreground block md:inline"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header

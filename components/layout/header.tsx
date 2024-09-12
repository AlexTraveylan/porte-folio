"use client"

import { navItems } from "@/lib/navigation"
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"

const Header = () => {
  const { theme, setTheme } = useTheme()
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useI18n()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLang = () => {
    const newLang = currentLocale === "fr" ? "en" : "fr"
    changeLocale(newLang)
  }

  return (
    <header className="relative flex justify-between items-center py-4 px-6 bg-background z-50">
      <Link
        href={navItems["home"].href}
        aria-label={t(navItems["home"].i18Aria)}
        className="text-2xl font-bold text-foreground"
      >
        <Image
          src="/logo.webp"
          alt="Logo"
          width={32}
          height={32}
          loading="lazy"
        />
      </Link>

      <nav
        className={`absolute top-10 right-0 bg-background md:bg-transparent md:static ${
          isMenuOpen ? "block" : "hidden"
        } md:block mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
          {Object.values(navItems).map((item) => (
            <li key={item.i18nKey}>
              <Link
                href={item.href}
                aria-label={t(item.i18Aria)}
                className="hover:text-muted-foreground block md:inline"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.i18nKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex">
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
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header

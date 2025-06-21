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
    <header className="relative flex justify-between items-center py-6 px-6 bg-background/95 backdrop-blur-sm border-b z-50">
      <Link
        href={navItems["home"].href}
        aria-label={t(navItems["home"].i18Aria)}
        className="text-3xl font-bold text-foreground hover:scale-105 transition-transform"
      >
        <Image
          src="/logo.webp"
          alt="Logo"
          width={40}
          height={40}
          loading="lazy"
        />
      </Link>

      <nav
        className={`absolute top-16 right-0 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg md:bg-transparent md:static md:border-0 md:shadow-none ${
          isMenuOpen ? "block" : "hidden"
        } md:block mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 p-4 md:p-0">
          {Object.values(navItems).map((item) => (
            <li key={item.i18nKey}>
              <Link
                href={item.href}
                aria-label={t(item.i18Aria)}
                className="text-lg font-medium hover:text-primary hover:scale-105 transition-all duration-200 block md:inline"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.i18nKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Link href="/contact">
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold px-4 md:px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            {t("contact.label")}
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={toggleTheme}
          className="rounded-full w-11 h-11 border-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
          aria-label="Basculer le thème"
        >
          <div className="relative">
            <Sun
              size={24}
              className="transition-all duration-300 dark:opacity-0 dark:rotate-90"
            />
            <Moon
              size={24}
              className="absolute inset-0 opacity-0 rotate-90 transition-all duration-300 dark:opacity-100 dark:rotate-0"
            />
          </div>
        </Button>
        <Button
          onClick={toggleLang}
          variant="outline"
          className="rounded-full w-11 h-11 border-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 text-lg"
        >
          {currentLocale === "fr" ? "🇫🇷" : "🇬🇧"}
        </Button>
        <Button
          className="md:hidden rounded-full w-14 h-14"
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-12 w-12" />
          ) : (
            <Menu className="h-12 w-12" />
          )}
        </Button>
      </div>
    </header>
  )
}

export default Header

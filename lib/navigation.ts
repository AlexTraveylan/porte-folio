type i18nKeyPossibilities =
  | "home.label"
  | "projects.label"
  | "faq.label"
  | "tarifs.label"

type i18nAriaPossibilities =
  | "home.aria"
  | "projects.aria"
  | "faq.aria"
  | "tarifs.aria"

type hrefPossibilities = "/" | "/#projects" | "/#faq" | "/#tarifs" | "/contact"

type recordOfNavPossibilities = "home" | "projects" | "faq" | "tarifs"

type NavItem = {
  i18nKey: i18nKeyPossibilities
  href: hrefPossibilities
  i18Aria: i18nAriaPossibilities
}

export const navItems: Record<recordOfNavPossibilities, NavItem> = {
  home: {
    i18nKey: "home.label",
    href: "/",
    i18Aria: "home.aria",
  },
  projects: {
    i18nKey: "projects.label",
    href: "/#projects",
    i18Aria: "projects.aria",
  },
  tarifs: {
    i18nKey: "tarifs.label",
    href: "/#tarifs",
    i18Aria: "tarifs.aria",
  },
  faq: {
    i18nKey: "faq.label",
    href: "/#faq",
    i18Aria: "faq.aria",
  },
}

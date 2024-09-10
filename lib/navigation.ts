type i18nKeyPossibilities =
  | "home.label"
  | "projects.label"
  | "faq.label"
  | "contact.label"

type i18nAriaPossibilities =
  | "home.aria"
  | "projects.aria"
  | "faq.aria"
  | "contact.aria"

type NavItem = {
  i18nKey: i18nKeyPossibilities
  href: string
  i18Aria: i18nAriaPossibilities
}

export const navItems: Record<string, NavItem> = {
  home: {
    i18nKey: "home.label",
    href: "/",
    i18Aria: "home.aria",
  },
  projects: {
    i18nKey: "projects.label",
    href: "/projects",
    i18Aria: "projects.aria",
  },
  faq: {
    i18nKey: "faq.label",
    href: "/faq",
    i18Aria: "faq.aria",
  },
  contact: {
    i18nKey: "contact.label",
    href: "/contact",
    i18Aria: "contact.aria",
  },
}

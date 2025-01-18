type i18nKeyPossibilities =
  | "home.label"
  | "projects.label"
  | "faq.label"
  | "services.label"
  | "tarifs.label"
  | "contact.label"

type i18nAriaPossibilities =
  | "home.aria"
  | "projects.aria"
  | "faq.aria"
  | "services.aria"
  | "tarifs.aria"
  | "contact.aria"

type hrefPossibilities =
  | "/"
  | "/#projects"
  | "/#faq"
  | "/#services"
  | "/#tarifs"
  | "/contact"

type recordOfNavPossibilities =
  | "home"
  | "projects"
  | "faq"
  | "services"
  | "tarifs"
  | "contact"

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
  services: {
    i18nKey: "services.label",
    href: "/#services",
    i18Aria: "services.aria",
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
  contact: {
    i18nKey: "contact.label",
    href: "/contact",
    i18Aria: "contact.aria",
  },
}

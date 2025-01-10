import { createI18nMiddleware } from "next-international/middleware"
import { NextRequest } from "next/server"

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
})

export function middleware(request: NextRequest) {
  const i18nResponse = I18nMiddleware(request)

  if (i18nResponse) {
    i18nResponse.headers.set(
      "Cache-Control",
      "public, max-age=3600, must-revalidate"
    )
  }

  return i18nResponse
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
}

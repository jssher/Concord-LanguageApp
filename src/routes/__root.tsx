import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Concord";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Concord is a parallel language course: one picture, one sentence, and the same meaning in every language you are learning.",
      },
      { name: "theme-color", content: "#f3ecdf" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,640&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=Noto+Sans:wght@400;600&family=Noto+Sans+JP:wght@500&family=Noto+Sans+KR:wght@500&family=Noto+Sans+SC:wght@500&family=Noto+Sans+HK:wght@500&family=Noto+Sans+Arabic:wght@500&family=Noto+Nastaliq+Urdu:wght@400&family=Noto+Sans+Hebrew:wght@500&family=Noto+Sans+Ethiopic:wght@500&family=Noto+Sans+Devanagari:wght@500&family=Noto+Sans+Bengali:wght@500&family=Noto+Sans+Gujarati:wght@500&family=Noto+Sans+Telugu:wght@500&family=Noto+Sans+Tamil:wght@500&family=Noto+Sans+Malayalam:wght@500&family=Noto+Sans+Thai:wght@500&family=Noto+Sans+Armenian:wght@500&family=Noto+Sans+Georgian:wght@500&family=Noto+Sans+Syriac:wght@400&family=Noto+Sans+Glagolitic:wght@400&family=Noto+Sans+Tifinagh:wght@400&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

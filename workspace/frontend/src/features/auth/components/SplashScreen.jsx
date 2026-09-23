import { useEffect } from "react"

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const timer = window.setTimeout(onComplete, reduceMotion ? 1 : 850)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <main className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="auth-splash-logo rounded-xl bg-blue-600 px-7 py-5 font-mono text-4xl font-bold tracking-[0.2em] text-white shadow-2xl shadow-blue-950/70">
        COR
      </div>
    </main>
  )
}

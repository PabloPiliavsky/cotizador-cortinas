import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import SplashScreen from "../SplashScreen"

describe("SplashScreen Component", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renderiza el logo de COR Metalconf y elementos corporativos al montarse", () => {
    render(<SplashScreen />)

    expect(screen.getByRole("dialog", { name: /pantalla de bienvenida/i })).toBeInTheDocument()
    expect(screen.getByText("COR")).toBeInTheDocument()
    expect(screen.getByText("Metalconf")).toBeInTheDocument()
    expect(screen.getByText(/Sistemas de Persianas & Aberturas/i)).toBeInTheDocument()
    expect(screen.getByText(/Click para continuar/i)).toBeInTheDocument()
  })

  it("permite saltar la animación inmediatamente al hacer clic", () => {
    const mockFinish = vi.fn()
    const { container } = render(<SplashScreen onFinish={mockFinish} />)

    const splashOverlay = screen.getByRole("dialog", { name: /pantalla de bienvenida/i })
    fireEvent.click(splashOverlay)

    expect(mockFinish).toHaveBeenCalledTimes(1)
    expect(container.firstChild).toBeNull()
  })

  it("completa su ciclo de animación por tiempo y llama a onFinish", () => {
    const mockFinish = vi.fn()
    render(<SplashScreen duration={1000} onFinish={mockFinish} />)

    // Avanzamos los timers hasta completar la duración
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(mockFinish).toHaveBeenCalledTimes(1)
  })
})

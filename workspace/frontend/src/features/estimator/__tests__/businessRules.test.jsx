import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import EstimatorOptions from "../components/EstimatorOptions"

describe("Reglas de Negocio - Cotizador de Persianas", () => {
  const mockCajones = [{ code: "CAJ001", name: "Cajón 155", price: 50 }]
  const mockEjes = [{ code: "EJE001", name: "Eje 60", price: 30 }]
  const mockMotores = [
    {
      code: "MOT_RADIO",
      name: "Motor Radiofrecuencia",
      price: 120,
      compatibleAcc: ["ACC_CONTROL", "BUR001"],
    },
    {
      code: "MOT_MEC",
      name: "Motor Mecánico",
      price: 70,
      compatibleAcc: ["ACC_TECLA", "BUR001"],
    },
  ]
  const mockAccesorios = [
    { code: "ACC_CONTROL", name: "Control Remoto", price: 25 },
    { code: "ACC_TECLA", name: "Pulsador Pared", price: 15 },
    { code: "BUR001", name: "Burlete Felpa", price: 8 },
  ]

  describe("Validación de Burlete Obligatorio", () => {
    it("muestra advertencia cuando la lama exige burlete y no hay ninguno seleccionado", () => {
      const lamaConBurlete = {
        code: "LAM_TERM",
        name: "Lama Térmica",
        requiredGasketCode: "BUR001",
      }

      render(
        <EstimatorOptions
          hasVuelo={true}
          setHasVuelo={vi.fn()}
          addVueloMeasure={false}
          setAddVueloMeasure={vi.fn()}
          cajones={mockCajones}
          selectedCajon={mockCajones[0]}
          setSelectedCajon={vi.fn()}
          ejes={mockEjes}
          selectedEje={mockEjes[0]}
          setSelectedEje={vi.fn()}
          motores={mockMotores}
          selectedMotor={mockMotores[0]}
          setSelectedMotor={vi.fn()}
          accesorios={mockAccesorios}
          selectedAccs={[]} // Sin accesorios
          setSelectedAccs={vi.fn()}
          selectedLama={lamaConBurlete}
        />
      )

      expect(
        screen.getByText(/La lama seleccionada requiere obligatoriamente un/i)
      ).toBeInTheDocument()
    })

    it("NO muestra advertencia si ya hay un burlete seleccionado", () => {
      const lamaConBurlete = {
        code: "LAM_TERM",
        name: "Lama Térmica",
        requiredGasketCode: "BUR001",
      }

      render(
        <EstimatorOptions
          hasVuelo={true}
          setHasVuelo={vi.fn()}
          addVueloMeasure={false}
          setAddVueloMeasure={vi.fn()}
          cajones={mockCajones}
          selectedCajon={mockCajones[0]}
          setSelectedCajon={vi.fn()}
          ejes={mockEjes}
          selectedEje={mockEjes[0]}
          setSelectedEje={vi.fn()}
          motores={mockMotores}
          selectedMotor={mockMotores[0]}
          setSelectedMotor={vi.fn()}
          accesorios={mockAccesorios}
          selectedAccs={[{ code: "BUR001", name: "Burlete Felpa", price: 8 }]}
          setSelectedAccs={vi.fn()}
          selectedLama={lamaConBurlete}
        />
      )

      expect(
        screen.queryByText(/La lama seleccionada requiere obligatoriamente un/i)
      ).not.toBeInTheDocument()
    })

    it("NO muestra advertencia si la lama no requiere burlete", () => {
      const lamaSinBurlete = {
        code: "LAM_ESTANDAR",
        name: "Lama Estándar",
        requiredGasketCode: "",
      }

      render(
        <EstimatorOptions
          hasVuelo={true}
          setHasVuelo={vi.fn()}
          addVueloMeasure={false}
          setAddVueloMeasure={vi.fn()}
          cajones={mockCajones}
          selectedCajon={mockCajones[0]}
          setSelectedCajon={vi.fn()}
          ejes={mockEjes}
          selectedEje={mockEjes[0]}
          setSelectedEje={vi.fn()}
          motores={mockMotores}
          selectedMotor={mockMotores[0]}
          setSelectedMotor={vi.fn()}
          accesorios={mockAccesorios}
          selectedAccs={[]}
          setSelectedAccs={vi.fn()}
          selectedLama={lamaSinBurlete}
        />
      )

      expect(
        screen.queryByText(/La lama seleccionada requiere obligatoriamente un/i)
      ).not.toBeInTheDocument()
    })
  })

  describe("Compatibilidad Motor - Accesorios", () => {
    it("deshabilita los accesorios que no son compatibles con el motor seleccionado", () => {
      // Motor Radiofrecuencia solo es compatible con ACC_CONTROL y BUR001
      render(
        <EstimatorOptions
          hasVuelo={true}
          setHasVuelo={vi.fn()}
          addVueloMeasure={false}
          setAddVueloMeasure={vi.fn()}
          cajones={mockCajones}
          selectedCajon={mockCajones[0]}
          setSelectedCajon={vi.fn()}
          ejes={mockEjes}
          selectedEje={mockEjes[0]}
          setSelectedEje={vi.fn()}
          motores={mockMotores}
          selectedMotor={mockMotores[0]} // MOT_RADIO
          setSelectedMotor={vi.fn()}
          accesorios={mockAccesorios}
          selectedAccs={[]}
          setSelectedAccs={vi.fn()}
          selectedLama={{ code: "L1" }}
        />
      )

      // Control remoto debe estar habilitado
      const controlCheckbox = screen.getByLabelText(/Control Remoto/i)
      expect(controlCheckbox).not.toBeDisabled()

      // Pulsador Pared (ACC_TECLA) NO es compatible con motor radio y debe estar disabled
      const pulsadorCheckbox = screen.getByLabelText(/Pulsador Pared/i)
      expect(pulsadorCheckbox).toBeDisabled()
    })
  })
})

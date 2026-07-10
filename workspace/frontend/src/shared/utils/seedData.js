export const initialLamas = [
  { code: "COR061", name: "Tablilla Ciega Galv 0,55", unit: "MTS", usefulHeight: 0.055, price: 1.90 },
  { code: "COR050", name: "Tablilla Ciega Galv 0,75", unit: "MTS", usefulHeight: 0.075, price: 2.34 },
  { code: "COR053", name: "Tablilla Ciega Galv 0,95", unit: "MTS", usefulHeight: 0.095, price: 3.02 },
  { code: "COR110", name: "Tablilla Ciega D.N. 0,95 120mm", unit: "MTS", usefulHeight: 0.120, price: 3.86 },
  { code: "COR051", name: "Tablilla Perf Galv 0,75", unit: "MTS", usefulHeight: 0.075, price: 2.53 },
  { code: "COR055", name: "Tablilla Perf Galv 0,95", unit: "MTS", usefulHeight: 0.095, price: 3.28 },
  { code: "COR137", name: "Tablilla Esterilla Galv 0,9", unit: "MTS", usefulHeight: 0.090, price: 3.83 }
]

export const initialEjes = [
  { code: "COR026", name: "Eje Cortina 70mm Esp 1,60mm", unit: "UN", price: 33.32 },
  { code: "COR020", name: "Eje Cortina 120mm Esp 1,25mm", unit: "UN", price: 43.58 },
  { code: "COR021", name: "Eje Cortina 160mm Esp 1,25mm", unit: "UN", price: 51.93 },
  { code: "COR025", name: "Eje Cortina 160mm Esp 1,60mm", unit: "UN", price: 66.63 }
]

export const initialGuias = [
  { code: "COR030", name: "Guía Común 50 x 20 1,25", unit: "UN", profileWidth: 0.050, price: 11.73 },
  { code: "COR032", name: "Guía Común 60 x 20 1,25", unit: "UN", profileWidth: 0.060, price: 12.36 },
  { code: "COR096", name: "Guía Segur 60 x 50 Galva 1,25", unit: "UN", profileWidth: 0.060, price: 22.18 },
  { code: "COR040", name: "Guía Segur 60 x 50 Galva 1,60", unit: "UN", profileWidth: 0.060, price: 28.47 }
]

export const initialCajones = [
  { code: "CAJ155", name: "Cajón Compacto 155", unit: "UN", heightAdjustment: 0.155, price: 45.00 },
  { code: "CAJ185", name: "Cajón Compacto 185", unit: "UN", heightAdjustment: 0.185, price: 55.00 },
  { code: "CAJ200", name: "Cajón Compacto 200", unit: "UN", heightAdjustment: 0.200, price: 65.00 }
]

export const initialMotores = [
  { code: "MOT001", name: "Manual (Polea/Cinta)", price: 0.00, compatibleAcc: ["FUN012", "COR048"] },
  { code: "MOT002", name: "Eléctrico Estándar Somfy", price: 120.00, compatibleAcc: ["FUN012", "ACC002"] },
  { code: "MOT003", name: "Eléctrico Inteligente Somfy IO", price: 250.00, compatibleAcc: ["FUN013", "ACC001"] }
]

export const initialAccesorios = [
  { code: "FUN012", name: "Cojinete 1\"", price: 2.71 },
  { code: "FUN013", name: "Cojinete 1 1/4\"", price: 3.36 },
  { code: "BAN001", name: "Bandereta Corta 250x100", price: 5.35 },
  { code: "COR048", name: "Pasa Cadena", price: 5.95 },
  { code: "ACC001", name: "Mando a distancia 1 Canal", price: 35.00 },
  { code: "ACC002", name: "Pulsador de pared", price: 15.00 }
]

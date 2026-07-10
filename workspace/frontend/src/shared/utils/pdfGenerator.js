import { jsPDF } from "jspdf"

export function generatePDF({ client, details, calcs }) {
  const doc = new jsPDF()
  doc.setFont("helvetica")
  
  // Blue slate header background
  doc.setFillColor(30, 41, 59)
  doc.rect(0, 0, 210, 40, "F")
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.text("COTIZACIÓN DE ABERTURAS Y PERSIANAS", 15, 25)
  
  doc.setFontSize(10)
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 155, 25)
  
  // Client section
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("DETALLE DEL CLIENTE", 15, 55)
  doc.setFont("helvetica", "normal")
  doc.text(`Cliente / Referencia: ${client}`, 15, 65)
  
  // Specifications section
  doc.setFont("helvetica", "bold")
  doc.text("ESPECIFICACIONES DEL SISTEMA", 15, 80)
  doc.setFont("helvetica", "normal")
  doc.text(`Ancho Inicial: ${details.width} m | Ancho Final: ${calcs.wFinal.toFixed(2)} m`, 15, 90)
  doc.text(`Alto Inicial: ${details.height} m | Alto Final: ${calcs.hFinal.toFixed(2)} m`, 15, 98)
  doc.text(`Lama/Tablilla: ${details.selectedLama?.name || "N/A"} (${calcs.slatsQty} un)`, 15, 106)
  if (details.hasGuides) {
    doc.text(`Guía Lateral: ${details.selectedGuide?.name || "N/A"} (${calcs.guideLen.toFixed(2)} m total)`, 15, 114)
    doc.text(`Eje/Tubo: ${details.selectedEje?.name || "N/A"}`, 15, 122)
  }
  doc.text(`Sistema de Motorización: ${details.selectedMotor?.name || "N/A"}`, 15, 130)

  // RENDER VECTOR SCHEMATIC (Persiana con lamas bajas)
  const drawX = 145
  const drawY = 80
  const drawW = 45
  const drawH = 50

  // Glass background
  doc.setFillColor(224, 242, 254)
  doc.rect(drawX, drawY, drawW, drawH, "F")
  doc.setDrawColor(156, 163, 175)
  doc.rect(drawX, drawY, drawW, drawH, "S")

  // Draw 10 closed slats (Lamas bajas)
  doc.setFillColor(156, 163, 175)
  doc.setDrawColor(75, 85, 99)
  const slatW = details.hasGuides ? drawW + 4 : drawW
  const slatX = details.hasGuides ? drawX - 2 : drawX
  for (let idx = 0; idx < 10; idx++) {
    doc.rect(slatX, drawY + idx * 5, slatW, 4.6, "FD")
  }

  // Draw Guides
  if (details.hasGuides) {
    doc.setFillColor(39, 39, 42)
    doc.rect(drawX - 3, drawY, 3, drawH, "F")
    doc.rect(drawX + drawW, drawY, 3, drawH, "F")
  }

  // Draw Shutter Box (Cajón compacto)
  if (details.hasVuelo) {
    doc.setFillColor(24, 24, 27)
    doc.setDrawColor(63, 63, 70)
    doc.rect(drawX - 5, drawY - 14, drawW + 10, 14, "FD")
  } else {
    // Axle Circle
    doc.setFillColor(39, 39, 42)
    doc.circle(drawX + drawW / 2, drawY - 7, 5, "FD")
  }
  
  // Cost breakdown
  doc.setFont("helvetica", "bold")
  doc.text("DESGLOSE DE COSTOS", 15, 145)
  doc.setFont("helvetica", "normal")
  let y = 155
  doc.text(`Costo de Lamas: $${calcs.slatsCost.toFixed(2)} USD`, 15, y); y += 8
  if (calcs.guidesCost > 0) { doc.text(`Costo de Guías: $${calcs.guidesCost.toFixed(2)} USD`, 15, y); y += 8 }
  if (calcs.ejeCost > 0) { doc.text(`Costo de Eje/Tubo: $${calcs.ejeCost.toFixed(2)} USD`, 15, y); y += 8 }
  if (calcs.motorCost > 0) { doc.text(`Costo de Motorización: $${calcs.motorCost.toFixed(2)} USD`, 15, y); y += 8 }
  if (calcs.accsCost > 0) { doc.text(`Costo de Accesorios: $${calcs.accsCost.toFixed(2)} USD`, 15, y); y += 8 }
  
  doc.line(15, y + 2, 195, y + 2)
  y += 12
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text(`TOTAL ESTIMADO: $${calcs.total.toFixed(2)} USD`, 15, y)
  
  doc.save(`Presupuesto_${client.replace(/\s+/g, "_")}.pdf`)
}

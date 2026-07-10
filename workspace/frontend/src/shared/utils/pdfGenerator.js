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

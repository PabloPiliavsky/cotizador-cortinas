import { jsPDF } from "jspdf"

export function generatePDF({ client, items, marginName, marginFactor }) {
  const doc = new jsPDF()
  doc.setFont("helvetica")
  
  // Blue slate header background
  doc.setFillColor(30, 41, 59)
  doc.rect(0, 0, 210, 40, "F")
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.text("PRESUPUESTO DE PERSIANAS Y ABERTURAS", 15, 25)
  
  doc.setFontSize(10)
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 155, 25)
  
  // Client & Margin section
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("INFORMACIÓN GENERAL", 15, 52)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Cliente / Referencia: ${client}`, 15, 60)
  doc.text(`Lista de Precios / Tarifa: ${marginName || "Base"}`, 15, 66)
  
  let y = 80
  let grandTotal = 0

  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.text("DETALLE DE CORTINAS COTIZADAS", 15, y)
  y += 8

  // Draw table header
  doc.setFillColor(241, 245, 249)
  doc.rect(15, y, 180, 7, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(51, 65, 85)
  doc.text("Ref", 17, y + 5)
  doc.text("Medidas", 35, y + 5)
  doc.text("Detalle Componentes (Precios con Recargo)", 65, y + 5)
  doc.text("Cant", 155, y + 5)
  doc.text("Subtotal", 172, y + 5)
  
  y += 7
  doc.setFont("helvetica", "normal")
  doc.setTextColor(30, 41, 59)

  items.forEach((item, index) => {
    const factor = marginFactor || 1
    const itemCalcs = item.calcs
    
    // Apply margin to each individual component
    const slatsWithMargin = itemCalcs.slatsCost * factor
    const guidesWithMargin = itemCalcs.guidesCost * factor
    const ejeWithMargin = itemCalcs.ejeCost * factor
    const cajonWithMargin = itemCalcs.cajonCost * factor
    const motorWithMargin = itemCalcs.motorCost * factor
    const accsWithMargin = itemCalcs.accsCost * factor

    const unitPrice = slatsWithMargin + guidesWithMargin + ejeWithMargin + cajonWithMargin + motorWithMargin + accsWithMargin
    const itemTotal = unitPrice * item.qty
    grandTotal += itemTotal

    // Estimamos la altura que ocupará este ítem (título + specs + desglose + espaciado)
    let neededSpace = 30
    if (guidesWithMargin > 0) neededSpace += 5
    if (cajonWithMargin > 0) neededSpace += 5
    if (ejeWithMargin > 0) neededSpace += 5
    if (motorWithMargin > 0) neededSpace += 5
    if (accsWithMargin > 0) neededSpace += 5

    if (y + neededSpace > 270) {
      doc.addPage()
      y = 20
    }

    // Dibujar recuadro de la cortina
    const finalBoxHeight = Math.max(38, neededSpace - 5)
    doc.setFillColor(248, 250, 252)
    doc.rect(15, y, 180, finalBoxHeight, "F")
    doc.setDrawColor(226, 232, 240)
    doc.rect(15, y, 180, finalBoxHeight, "S")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(30, 41, 59)
    doc.text(`${item.name || `Cortina ${index + 1}`}  -  Cantidad: ${item.qty} un`, 20, y + 8)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8.5)
    doc.text(`Medidas Iniciales: ${item.width}m x ${item.height}m  |  Finales: ${itemCalcs.wFinal.toFixed(2)}m x ${itemCalcs.hFinal.toFixed(2)}m`, 20, y + 14)

    let compY = y + 20
    doc.setFont("helvetica", "bold")
    doc.text("Desglose unitario (con recargo aplicado):", 20, compY)
    doc.setFont("helvetica", "normal")
    compY += 5

    // Listar componentes detallados
    doc.text(`• Lama/Tablilla: ${item.details.selectedLama?.name || "N/A"} - $${slatsWithMargin.toFixed(2)} USD`, 22, compY)
    compY += 5

    if (guidesWithMargin > 0) {
      doc.text(`• Guías Laterales: ${item.details.selectedGuide?.name || "N/A"} - $${guidesWithMargin.toFixed(2)} USD`, 22, compY)
      compY += 5
    }
    if (cajonWithMargin > 0) {
      doc.text(`• Cajón (Vuelo): ${item.details.selectedCajon?.name || "N/A"} - $${cajonWithMargin.toFixed(2)} USD`, 22, compY)
      compY += 5
    }
    if (ejeWithMargin > 0) {
      doc.text(`• Eje/Tubo: ${item.details.selectedEje?.name || "N/A"} - $${ejeWithMargin.toFixed(2)} USD`, 22, compY)
      compY += 5
    }
    if (motorWithMargin > 0) {
      doc.text(`• Motorización: ${item.details.selectedMotor?.name || "N/A"} - $${motorWithMargin.toFixed(2)} USD`, 22, compY)
      compY += 5
    }
    if (accsWithMargin > 0) {
      doc.text(`• Accesorios seleccionados: $${accsWithMargin.toFixed(2)} USD`, 22, compY)
      compY += 5
    }

    // --- DIBUJAR REPRESENTACIÓN VECTORIAL EN EL PDF ---
    // Colocamos el diagrama a la derecha del recuadro
    const drawX = 160
    const drawY = y + 12
    const drawW = 25
    const drawH = 22

    // Fondo del vidrio
    doc.setFillColor(224, 242, 254)
    doc.rect(drawX, drawY, drawW, drawH, "F")
    doc.setDrawColor(186, 230, 253)
    doc.rect(drawX, drawY, drawW, drawH, "S")

    // Lamas
    doc.setFillColor(148, 163, 184)
    doc.setDrawColor(100, 116, 139)
    const slatW = item.details.hasGuides ? drawW + 2 : drawW
    const slatX = item.details.hasGuides ? drawX - 1 : drawX
    for (let idx = 0; idx < 6; idx++) {
      doc.rect(slatX, drawY + idx * 3.5, slatW, 3, "FD")
    }

    // Guías
    if (item.details.hasGuides) {
      doc.setFillColor(71, 85, 105)
      doc.rect(drawX - 2.5, drawY, 2.5, drawH, "F")
      doc.rect(drawX + drawW, drawY, 2.5, drawH, "F")
    }

    // Cajón Compacto o Eje
    if (item.details.hasVuelo) {
      doc.setFillColor(30, 41, 59)
      doc.rect(drawX - 3.5, drawY - 7, drawW + 7, 7, "F")
    } else {
      doc.setFillColor(148, 163, 184)
      doc.circle(drawX + drawW / 2, drawY - 3.5, 3, "F")
    }

    // Precio Unitario y Subtotal al costado central derecho
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.text(`Unit: $${unitPrice.toFixed(2)}`, 115, y + 8)
    doc.setFontSize(9)
    doc.setTextColor(37, 99, 235)
    doc.text(`Sub: $${itemTotal.toFixed(2)}`, 115, y + 13)
    doc.setTextColor(30, 41, 59)

    y += Math.max(neededSpace, 43)
  })

  // Grand Total
  if (y > 250) {
    doc.addPage()
    y = 30
  }
  
  y += 10
  doc.setDrawColor(203, 213, 225)
  doc.line(15, y, 195, y)
  y += 10
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.setTextColor(30, 41, 59)
  doc.text(`TOTAL PRESUPUESTO: $${grandTotal.toFixed(2)} USD`, 15, y)
  
  doc.save(`Presupuesto_${client.replace(/\s+/g, "_")}.pdf`)
}


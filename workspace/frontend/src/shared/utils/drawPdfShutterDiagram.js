export default function drawPdfShutterDiagram(doc, item, x, y) {
  const details = item.details || item
  const hasGuides = details.hasGuides ?? item.hasGuides
  const hasVuelo = details.hasVuelo ?? item.hasVuelo

  const drawW = 25
  const drawH = 22

  // Fondo del vidrio
  doc.setFillColor(224, 242, 254)
  doc.rect(x, y, drawW, drawH, "F")
  doc.setDrawColor(186, 230, 253)
  doc.rect(x, y, drawW, drawH, "S")

  // Lamas
  doc.setFillColor(148, 163, 184)
  doc.setDrawColor(100, 116, 139)
  const slatW = hasGuides ? drawW + 2 : drawW
  const slatX = hasGuides ? x - 1 : x
  for (let idx = 0; idx < 6; idx++) {
    doc.rect(slatX, y + idx * 3.5, slatW, 3, "FD")
  }

  // Guías laterales
  if (hasGuides) {
    doc.setFillColor(71, 85, 105)
    doc.rect(x - 2.5, y, 2.5, drawH, "F")
    doc.rect(x + drawW, y, 2.5, drawH, "F")
  }

  // Cajón compacto o eje
  if (hasVuelo) {
    doc.setFillColor(30, 41, 59)
    doc.rect(x - 3.5, y - 7, drawW + 7, 7, "F")
  } else {
    doc.setFillColor(148, 163, 184)
    doc.circle(x + drawW / 2, y - 3.5, 3, "F")
  }
}

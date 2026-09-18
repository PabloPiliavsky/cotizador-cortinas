import {
  collection,
  doc,
  getFirestore,
  getDocs,
  serverTimestamp,
  terminate,
  writeBatch,
} from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { loadEnv } from "vite"
import { createFirebaseConfig } from "../src/lib/firebaseConfig.js"
import {
  initialAccesorios,
  initialCajones,
  initialEjes,
  initialGuias,
  initialLamas,
  initialMargins,
  initialMotores,
} from "../src/shared/utils/seedData.js"

const firebaseConfig = createFirebaseConfig(
  loadEnv("development", process.cwd(), "VITE_"),
)
const db = getFirestore(initializeApp(firebaseConfig))

const mockData = {
  lamas: initialLamas,
  ejes: initialEjes,
  guias: initialGuias,
  cajones: initialCajones,
  motores: initialMotores,
  accesorios: initialAccesorios,
  margins: initialMargins,
}

const getDocumentId = (collectionName, item) =>
  collectionName === "margins" ? item.id : item.code

async function seed() {
  const batch = writeBatch(db)

  for (const [collectionName, items] of Object.entries(mockData)) {
    for (const item of items) {
      batch.set(doc(db, collectionName, getDocumentId(collectionName, item)), item)
    }
  }

  batch.set(doc(db, "app_config", "initial_data"), {
    seeded: true,
    seededAt: serverTimestamp(),
  })
  await batch.commit()

  const counts = {}
  for (const collectionName of Object.keys(mockData)) {
    const snapshot = await getDocs(collection(db, collectionName))
    counts[collectionName] = snapshot.size
  }

  console.log("Datos mock cargados en Firestore:")
  console.table(counts)
}

try {
  await seed()
} catch (error) {
  console.error("No se pudo cargar Firestore:", error.message)
  process.exitCode = 1
} finally {
  await terminate(db)
}

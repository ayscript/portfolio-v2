import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Personal Info
export async function getPersonalInfo() {
  try {
    const docRef = doc(db, "personalInfo", "main")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // Return default data if no document exists
      return {
        name: "John Doe",
        title: "Fullstack Developer",
        email: "john.doe@example.com",
        location: "New York, USA",
        jobStatus: "Full-time/Freelancer",
        website: "portfolio.dev",
        bio: "I help businesses grow by crafting amazing web experiences. If you are looking for a developer that likes to get stuff done, then let's talk.",
        profilePicture: "/placeholder.svg?height=150&width=150",
      }
    }
  } catch (error) {
    console.error("Error getting personal info:", error)
    throw error
  }
}

export async function updatePersonalInfo(data: any) {
  try {
    const docRef = doc(db, "personalInfo", "main")
    await setDoc(docRef, data, { merge: true })
    return true
  } catch (error) {
    console.error("Error updating personal info:", error)
    throw error
  }
}

// Projects
export async function getProjects() {
  try {
    const projectsRef = collection(db, "projects")
    const q = query(projectsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return projects
  } catch (error) {
    console.error("Error getting projects:", error)
    throw error
  }
}

export async function getProject(id: string) {
  try {
    const docRef = doc(db, "projects", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      }
    } else {
      throw new Error("Project not found")
    }
  } catch (error) {
    console.error("Error getting project:", error)
    throw error
  }
}

export async function createProject(data: any) {
  try {
    const projectsRef = collection(db, "projects")
    const newProjectRef = doc(projectsRef)

    await setDoc(newProjectRef, {
      ...data,
      createdAt: new Date().toISOString(),
    })

    return newProjectRef.id
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const docRef = doc(db, "projects", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

export async function deleteProject(id: string) {
  try {
    const docRef = doc(db, "projects", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Certifications
export async function getCertifications() {
  try {
    const certificationsRef = collection(db, "certifications")
    const q = query(certificationsRef, orderBy("date", "desc"))
    const querySnapshot = await getDocs(q)

    const certifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return certifications
  } catch (error) {
    console.error("Error getting certifications:", error)
    throw error
  }
}

export async function getCertification(id: string) {
  try {
    const docRef = doc(db, "certifications", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      }
    } else {
      throw new Error("Certification not found")
    }
  } catch (error) {
    console.error("Error getting certification:", error)
    throw error
  }
}

export async function createCertification(data: any) {
  try {
    const certificationsRef = collection(db, "certifications")
    const newCertificationRef = doc(certificationsRef)

    await setDoc(newCertificationRef, data)

    return newCertificationRef.id
  } catch (error) {
    console.error("Error creating certification:", error)
    throw error
  }
}

export async function updateCertification(id: string, data: any) {
  try {
    const docRef = doc(db, "certifications", id)
    await updateDoc(docRef, data)
    return true
  } catch (error) {
    console.error("Error updating certification:", error)
    throw error
  }
}

export async function deleteCertification(id: string) {
  try {
    const docRef = doc(db, "certifications", id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error deleting certification:", error)
    throw error
  }
}

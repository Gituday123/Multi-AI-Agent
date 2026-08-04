import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from "./utils/firebase"
import api from "./utils/axios"

const App = () => {
  // Send the Firebase ID token to the backend
  const handleLogin = async (idToken) => {
    try {
      const { data } = await api.post("/auth/login", { idToken })
      console.log("User saved:", data)
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log("Google login successful:", result.user.displayName)

      // Get the Firebase ID token and send it to backend
      const idToken = await result.user.getIdToken()
      await handleLogin(idToken)
    } catch (error) {
      console.error("Google login error:", error)
    }
  }

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button
        className='w-52 h-14 bg-white text-black text-lg font-medium rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer'
        onClick={googleLogin}
      >
        Continue with Google
      </button>
    </div>
  )
}

export default App
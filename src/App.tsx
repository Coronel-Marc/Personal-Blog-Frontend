import { useState } from 'react'
import { AppRouter } from '@/routes'
import { AuthProvider } from '@/context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App

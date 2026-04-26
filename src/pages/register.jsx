import { useState } from "react"
import API from "../services/api"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      await API.post("/auth/register", {
        email,
        password,
      })

      setMessage("Compte créé avec succès.")
      setEmail("")
      setPassword("")
    } catch (err) {
      setError(
        err.response?.data?.detail || "Erreur lors de la création du compte."
      )
    }
  }

  return (
    <main>
      <h1>Créer un compte</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Créer mon compte</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </main>
  )
}
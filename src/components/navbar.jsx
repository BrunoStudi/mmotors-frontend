import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setMenuOpen(false)
    navigate("/login")
  }

  let isAdmin = false

  if (token) {
    isAdmin = JSON.parse(atob(token.split(".")[1])).role === "admin"
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        M-Motors
      </Link>

      <button
        className="burger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Ouvrir le menu"
        type="button"
      >
        {menuOpen ? "×" : "☰"}
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Accueil</Link>
        <Link to="/vehicles" onClick={closeMenu}>Véhicules</Link>

        {token && (
          <Link
            to={isAdmin ? "/admin/dossiers" : "/mes-dossiers"}
            onClick={closeMenu}
          >
            {isAdmin ? "Dossiers clients" : "Mes dossiers"}
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login" onClick={closeMenu}>Connexion</Link>
            <Link to="/register" onClick={closeMenu}>Inscription</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Déconnexion</button>
        )}
      </div>
    </nav>
  )
}
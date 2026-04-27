import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"

export default function EditVehicle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [vehicle, setVehicle] = useState(null)

  const [form, setForm] = useState({
    brand: "",
    model: "",
    price: "",
    type: "vente",
    mileage: "",
    year: "",
    engine: "",
    power: "",
    description: "",
  })

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await API.get(`/vehicles/${id}`)
        const v = res.data

        setForm({
          brand: v.brand || "",
          model: v.model || "",
          price: v.price || "",
          type: v.type || "vente",
          mileage: v.mileage || "",
          year: v.year || "",
          engine: v.engine || "",
          power: v.power || "",
          description: v.description || "",
        })

        setVehicle(v)

      } catch (err) {
        console.error(err)
      }
    }

    fetchVehicle()
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    try {
      await API.put(
        `/vehicles/${id}`,
        {
          brand: form.brand,
          model: form.model,
          price: Number(form.price),
          type: form.type,
          mileage: form.mileage ? Number(form.mileage) : null,
          year: form.year ? Number(form.year) : null,
          engine: form.engine || null,
          power: form.power ? Number(form.power) : null,
          description: form.description || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (images.length > 0) {
        const token = localStorage.getItem("token")

        for (const image of images) {
          const formData = new FormData()
          formData.append("image", image)

          await API.post(
            `/vehicles/${id}/images`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
        }
      }

      navigate(`/vehicles/${id}`)
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la modification")
    }
  }

  const handleDeleteImage = async (imageId) => {
    const confirmDelete = window.confirm("Supprimer cette image ?")

    if (!confirmDelete) return

    const token = localStorage.getItem("token")

    try {
      await API.delete(`/vehicles/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setVehicle({
        ...vehicle,
        images: vehicle.images.filter((img) => img.id !== imageId),
      })
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la suppression de l'image.")
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Modifier le véhicule</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="Marque" />
          <input name="model" value={form.model} onChange={handleChange} placeholder="Modèle" />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Prix" />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>

          <input name="mileage" type="number" value={form.mileage} onChange={handleChange} placeholder="Kilométrage" />
          <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Année" />
          <input name="engine" value={form.engine} onChange={handleChange} placeholder="Motorisation" />
          <input name="power" type="number" value={form.power} onChange={handleChange} placeholder="Puissance" />

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

          {vehicle?.images?.length > 0 && (
            <div className="edit-images">
              <p>Images actuelles :</p>

              <div className="edit-thumbnails">
                {vehicle.images.map((img) => (
                  <div key={img.id} className="edit-thumbnail-wrapper">
                    <img
                      src={`http://127.0.0.1:8000${img.image_url}`}
                      alt="vehicle"
                    />

                    <button
                      type="button"
                      className="delete-image-btn"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <label>
            Ajouter des images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </label>

          <button type="submit" className="btn primary">
            Sauvegarder
          </button>
        </form>
      </section>
    </main>
  )
}
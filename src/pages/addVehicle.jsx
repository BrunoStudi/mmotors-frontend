import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function AddVehicle() {
    const navigate = useNavigate()

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

    const [error, setError] = useState("")
    const [images, setImages] = useState([])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const token = localStorage.getItem("token")

        try {
            const response = await API.post(
                "/vehicles/",
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

            const vehicleId = response.data.id

            if (images.length > 0) {
                for (const image of images) {
                    const formData = new FormData()
                    formData.append("image", image)

                    await API.post(
                        `/vehicles/${vehicleId}/images`,
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

            navigate("/vehicles")
        } catch (err) {
            setError("Erreur lors de la création du véhicule.")
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card vehicle-form-card">
                <p className="badge">Back-office</p>
                <h1>Ajouter un véhicule</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Marque
                        <input name="brand" value={form.brand} onChange={handleChange} required />
                    </label>

                    <label>
                        Modèle
                        <input name="model" value={form.model} onChange={handleChange} required />
                    </label>

                    <label>
                        Prix
                        <input name="price" type="number" value={form.price} onChange={handleChange} required />
                    </label>

                    <label>
                        Type
                        <select name="type" value={form.type} onChange={handleChange}>
                            <option value="vente">Vente</option>
                            <option value="location">Location</option>
                        </select>
                    </label>

                    <label>
                        Kilométrage
                        <input name="mileage" type="number" value={form.mileage} onChange={handleChange} />
                    </label>

                    <label>
                        Année
                        <input name="year" type="number" value={form.year} onChange={handleChange} />
                    </label>

                    <label>
                        Motorisation
                        <input name="engine" value={form.engine} onChange={handleChange} />
                    </label>

                    <label>
                        Puissance
                        <input name="power" type="number" value={form.power} onChange={handleChange} />
                    </label>

                    <label>
                        Description
                        <textarea name="description" value={form.description} onChange={handleChange} />
                    </label>

                    <label>
                        Photo du véhicule
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages(Array.from(e.target.files))}
                        />
                        {images.length > 0 && (
                            <p className="selected-files">
                                {images.length} image(s) sélectionnée(s)
                            </p>
                        )}
                    </label>

                    <button className="btn primary full" type="submit">
                        Créer le véhicule
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </section>
        </main>
    )
}
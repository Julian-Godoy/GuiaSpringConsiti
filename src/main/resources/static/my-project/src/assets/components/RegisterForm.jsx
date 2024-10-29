import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const registerEndpoint = "http://localhost:8080/user/register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Realiza la solicitud POST con axios
            const response = await axios.post(registerEndpoint, {
                name,
                lastname,
                email,
                password,
            });

            console.log("Registro Response:", response.data);

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Te has registrado correctamente. Puedes iniciar sesión.',
                confirmButtonText: 'Aceptar'
            });

            // Limpiar los campos después del registro exitoso
            setName("");
            setLastname("");
            setEmail("");
            setPassword("");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un problema al registrarte. Intenta nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <form className="bg-gray-900 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-4 text-white">Registrarse</h2>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-300 mr-4 w-32">Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-300 mr-4 w-32">Apellido:</label>
                <input
                    type="text"
                    name="last_name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-300 mr-4 w-32">Correo:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-300 mr-4 w-32">Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="flex justify-center mt-6">
                <button className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
                    Registrarse
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;

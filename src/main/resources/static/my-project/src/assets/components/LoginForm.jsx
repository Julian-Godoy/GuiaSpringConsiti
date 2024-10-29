import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const LogendPoint = "http://localhost:8080/auth/login";

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await axios.post(LogendPoint, { email, password });
            const token = response.data.jwt;
            console.log("Login Response:", response.data);

            console.log(token)


            if (token) {
                localStorage.setItem("token", token); // Guardar token en localStorage
                console.log("Token guardado:", localStorage.getItem("token"));
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Has iniciado sesión correctamente.',
                    confirmButtonText: 'Aceptar'
                });
                window.location = "/Dashboard"; // Redirigir
            } else {
                throw new Error("No se recibió un token de autenticación.");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un problema al iniciar sesión. Intenta nuevamente.',
                confirmButtonText: 'Aceptar'
            });
            setErrorMessage(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <form className="bg-gray-900 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-4 text-white">Iniciar Sesión</h2>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <div className="mb-4 flex items-center">
                <label className="block text-gray-300 mr-4 w-24">Correo:</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-300 mr-4 w-24">Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <button className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
                Iniciar Sesión
            </button>
        </form>
    );
};

export default LoginForm;

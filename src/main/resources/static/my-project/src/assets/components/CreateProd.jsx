import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateProd = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const createEnd = "http://localhost:8080/product/create";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Token no encontrado. Por favor, inicia sesión.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        createEnd,
        { name, description, price, stock },
        config
      );

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Has cargado el producto correctamente.',
        confirmButtonText: 'Aceptar',
      });

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Ocurrió un problema al cargar el producto. Intenta nuevamente.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg">
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          &times; 
        </button>

        <h2 className="text-2xl mb-4 text-white text-center">Agregar Producto</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Precio:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProd;

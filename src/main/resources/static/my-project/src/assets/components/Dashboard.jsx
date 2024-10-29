import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProd from './CreateProd';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    const toggleCreateProd = () => {
        setShowCreateProduct(!showCreateProduct);
    };

    const fetchProducts = async () => {
      console.log("Intentando cargar productos..."); // Verifica que se llame
      const token = localStorage.getItem("token");
      if (!token) {
          console.error("Token no encontrado");
          return;
      }
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };
      try {
          const response = await axios.get("http://localhost:8080/product/list", config);
          
          // Filtrar productos para excluir los que están en estado "UNAVAILABLE"
          const availableProducts = response.data.filter(product => product.productStatus !== "UNAVAILABLE");
          
          setProducts(availableProducts);
          console.log("Productos cargados:", availableProducts); // Verifica la respuesta
      } catch (error) {
          console.error('Error al cargar productos:', error);
      }
  };
  

    const handleAddToCart = (product) => {
        console.log(`Producto agregado al carrito: ${product.name}`);
    };

    const handleLogout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Deseas cerrar sesión!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        });
    };

    const handleDeleteProduct = async (id) => {
        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Este producto será eliminado permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmDelete.isConfirmed) {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                await axios.delete(`http://localhost:8080/product/delete/${id}`, config);
                Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
                fetchProducts(); // Refresca la lista de productos
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-800 to-purple-700 min-h-screen">
            <nav className="bg-gray-800 p-4 flex justify-end items-center border-b border-gray-700">
                <div className="flex space-x-6">
                    <a href="/dashboard" className="text-white hover:text-gray-400">Productos</a>
                    <a href="/profile" className="text-white hover:text-gray-400">Perfil</a>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300 ml-4">
                    Cerrar Sesión
                </button>
            </nav>

            <div className="p-6">
                <div className="flex justify-between mb-4">
                    <button
                        onClick={toggleCreateProd}
                        className="bg-green-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                        {showCreateProduct ? 'Cerrar Formulario' : 'Agregar Producto'}
                    </button>
                    <button
                        onClick={fetchProducts} // Llama a fetchProducts para refrescar la lista
                        className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                        Refrescar Productos
                    </button>
                </div>

                {showCreateProduct && (
                    <CreateProd onClose={toggleCreateProd} className="bg-gray-900 text-white p-4 rounded-md" />
                )}

                <h2 className="text-3xl mb-6 text-white">Listado de Productos</h2>

                <div className="text-white bg-gray-700 p-4 rounded-lg border border-gray-700">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="mb-4 p-4 border-b border-gray-600 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl">{product.name}</h3>
                                    <p className="mt-2">{product.description}</p>
                                    <p className="mt-2">${product.price}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </div>
            </div>

            <footer className="flex items-center justify-center py-6 bg-gray-800 text-white w-full mt-10">
                <a href="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" target="_blank" rel="noopener noreferrer" className="mr-2">
                    <img src="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" alt="Logo Consiti" className="w-8 h-8" />
                </a>
                <p className="mx-2">Desarrollado en el Bootcamp Consiti.</p>
                <a href="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" target="_blank" rel="noopener noreferrer" className="ml-2">
                    <img src="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" alt="Logo Egg" className="w-8 h-8" />
                </a>
            </footer>
        </div>
    );
};

export default Dashboard;

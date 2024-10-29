import { useState, useEffect } from "react";
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const userProfile = async () => {
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
      const response = await axios.get("http://localhost:8080/user/profile", config);
      console.log(response);
      setProfile(response.data); 
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <div className="justify-center items-center bg-gradient-to-r from-blue-800 to-purple-700 min-h-screen">
      <nav className="bg-gray-800 p-4 flex justify-end items-center border-b border-gray-700">
        <div className="flex space-x-6">
          <a href="/dashboard" className="text-white hover:text-gray-400">Productos</a>
          <a href="/profile" className="text-white hover:text-gray-400">Perfil</a>
        </div>
        <button className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300 ml-4">
          Cerrar Sesión
        </button>
      </nav>

      <div className="p-6 flex justify-center">
        
        <div className="flex-shrink-0 mr-8 text-center bg-opacity-50 bg-gray-900 p-6 rounded-lg shadow-lg">
          
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white">
            
            <span>👤</span>
          </div>
          
          {profile && (
            <p className="mt-4 text-xl text-white">{profile.name} {profile.last_name}</p>
          )}
        </div>

        
        <div className="text-xl text-white bg-opacity-50 bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl mb-6">Perfil</h1>
          {profile ? (
            <div className="mb-4 p-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <label className="text-gray-300 font-semibold">Rol:</label>
                <span className="text-gray-100">{profile.rol}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <label className="text-gray-300 font-semibold">Email:</label>
                <span className="text-gray-100">{profile.email}</span>
              </div>
            </div>
          ) : (
            <p>No existe perfil</p>
          )}

          
          <div className="flex justify-end">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center py-6 bg-gray-800 text-white w-full mt-10">
        <a href="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" target="_blank" rel="noopener noreferrer" className="mr-2">
          <img src="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" alt="Logo Consiti" className="w-8 h-8" />
        </a>
        <p className="mx-2">Desarrollado en el Bootcamp Consiti.</p>
        <a href="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" target="_blank" rel="noopener noreferrer" className="ml-2">
          <img src="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" alt="Logo Consiti" className="w-8 h-8" />
        </a>
      </footer>
    </div>
  );
};

export default Profile;

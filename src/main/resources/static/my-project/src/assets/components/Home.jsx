import { useState } from "react";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const Home = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const toggleRegisterForm = () => {
        setShowRegister(!showRegister);
        setShowLogin(false); // Cierra el formulario de login si estaba abierto
    };

    const toggleLoginForm = () => {
        setShowLogin(!showLogin);
        setShowRegister(false); // Cierra el formulario de registro si estaba abierto
    };

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-800 to-purple-800">
            <div className="text-center py-10 bg-opacity-50 bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h1 className="text-5xl font-bold text-white mb-4">Bienvenido a la Guía de React</h1>
                <p className="text-lg text-gray-300 mb-8">
                    Regístrate, gestiona y visualiza tus productos de manera simple y rápida.
                </p>
                <div>
                    <button 
                        onClick={toggleRegisterForm} 
                        className="bg-gray-900 text-white px-6 py-3 rounded-md mr-4 hover:bg-gray-700 transition duration-300"
                    >
                        {showRegister ? 'Registrarse' : 'Registrarse'}
                    </button>
                    <button 
                        onClick={toggleLoginForm} 
                        className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300"
                    >
                        {showLogin ? 'Cerrar' : 'Iniciar Sesión'}
                    </button>
                </div>
                {showRegister && (
                    <RegisterForm className="bg-gray-900 text-white p-4 rounded-md" />
                )}
                {showLogin && (
                    <LoginForm className="bg-gray-900 text-white p-4 rounded-md" />
                )}
            </div>

{/* Footer */}
<footer className="flex items-center justify-center py-6 bg-gray-900 text-white w-full mt-10">
    <a href="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" target="_blank" rel="noopener noreferrer" className="mr-2">
        <img src="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" alt="Logo Consiti" className="w-8 h-8" />
    </a>
    <p className="mx-2 text-lg">Desarrollado en el Bootcamp Consiti.</p>
    <a href="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" target="_blank" rel="noopener noreferrer" className="ml-2">
        <img src="http://moodle.grupoconsiti.com:51830/theme/image.php/almondb/theme/1704133391/favicon" alt="Logo Consiti" className="w-8 h-8" />
    </a>
</footer>

        </div>
    );
};

export default Home;

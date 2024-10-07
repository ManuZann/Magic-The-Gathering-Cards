import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 p-4 shadow-md mb-5">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Magic The Gathering</h1>
                <nav>
                    <Link to="/" className="text-white mx-2 hover:text-blue-300">Inicio</Link>
                    <Link to="/create" className="text-white mx-2 hover:text-blue-300">Crear Carta</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
import { useNavigate } from 'react-router-dom';
import { CardModel } from '../utilities/Card.model';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: CardModel | null;
}

const Modal = ({ card, isOpen, onClose }: ModalProps) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL

    if (!isOpen || !card) return null;

    const handleEdit = () => {
        navigate(`/edit/${card._id}`);
    };

    const handleDelete = async () => {
        if (card?._id) {
            try {
                await fetch(`${apiUrl}/api/cards/${card._id}`, {
                    method: 'DELETE',
                });
                onClose();
            } catch (error) {
                console.error('Error al eliminar la carta:', error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-3xl w-full flex relative">
                <div className="flex-shrink-0">
                    <img src={card.imageUrl} alt={card.name} className="w-64 h-80 object-cover rounded-md" />
                </div>
                <div className="ml-8 text-white pl-10">
                    <h2 className="text-3xl font-bold">{card.name}</h2>
                    <p className="mt-4"><strong>Rareza:</strong> {card.rarity}</p>
                    <p className="mt-2"><strong>Costo de maná:</strong> {card.manaCost || 'N/A'}</p>
                    <p className="mt-2"><strong>Tipo:</strong> {card.type || 'N/A'}</p>
                    <p className="mt-2"><strong>Set:</strong> {card.set || 'N/A'}</p>
                    <div className="mt-2">
                        <p className="inline"><strong>Poder:</strong> {card.power || 'N/A'}</p>
                        <span className="mx-2"> |</span>
                        <p className="inline"><strong>Tenacidad:</strong> {card.toughness || 'N/A'}</p>
                    </div>
                    <div className="mt-10">
                        <button onClick={handleEdit} className="text-white mx-4 py-2 px-4 rounded">
                            Editar Carta
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">
                            Eliminar Carta
                        </button>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
                    aria-label="Cerrar modal"
                >
                    &times; {/* X para cerrar */}
                </button>
                
            </div>
        </div>
    );
};

export default Modal
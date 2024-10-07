import { useState, useEffect } from 'preact/hooks';
import Card from './Card';
import Modal from './ModalCard';
import { CardModel } from '../utilities/Card.model';
// import { Link } from 'react-router-dom';

const CardList = () => {
    const [data, setData] = useState({totalPages: 1, cards: []});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage, setCardsPerPage] = useState<number>(20);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [rarityFilter, setRarityFilter] = useState<string>('')
    const [pageInput, setPageInput] = useState<string>(`${currentPage}`)
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchCards = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cards/?page=${currentPage}&limit=${cardsPerPage}&name=${searchTerm}&rarity=${rarityFilter}`)
            const fetdata = await response.json()
            setData(fetdata)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchCards();
    }, [currentPage, cardsPerPage, searchTerm, rarityFilter, isModalOpen]);


    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= data.totalPages) {
            setCurrentPage(pageNumber);
            setPageInput(`${pageNumber}`);
        }
    };

    const handleInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement
        setSearchTerm(target.value)
    }

    const handleRarityChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        setRarityFilter(target.value);
    };

    const handleLimitChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setCardsPerPage(Number(target.value));
    };

    const handlePageInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setPageInput(target.value);
    };

    const handlePageInputBlur = () => {
        const pageNumber = parseInt(pageInput);
        if (!isNaN(pageNumber)) {
            paginate(pageNumber);
        }
    };

    const openModal = (card: CardModel) => {
        setSelectedCard(card);
        setIsModalOpen(true);
      };
    
    return (
        <div>
            <div className="mb-4 h-10 flex space-x-4">
                <input
                    type="text"
                    placeholder="Buscar cartas..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full"
                />
                <select
                    value={rarityFilter}
                    onChange={handleRarityChange}
                    className="border rounded p-2"
                >
                    <option value="">Todas las rarezas</option>
                    <option value="Common">Común</option>
                    <option value="Uncommon">Poco común</option>
                    <option value="Rare">Rara</option>
                    <option value="Mythic Rare">Mítica Rara</option>
                    <option value="Special">Especial</option>
                    <option value="Basic Land">Tierra Basica</option>
                </select>
                {/* <button className="py-2 px-4 rounded text-nowrap">
                    <Link to="/create" className="text-white">
                        Nueva Carta
                    </Link>
                </button> */}
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {data.cards.map((card: CardModel) => (
                    <div key={card.id} onClick={() => openModal(card)} className="cursor-pointer">
                        <Card id={card.id} name={card.name} imageUrl={card.imageUrl} />
                    </div>
                ))}
            </div>
            <div className="mt-4 mb-3 flex items-center justify-center">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <div className="mx-4">
                    <label htmlFor="pageInput" className="mr-2">Página</label>
                    <input
                        type="number"
                        id="pageInput"
                        value={pageInput}
                        onChange={handlePageInputChange}
                        onBlur={handlePageInputBlur}
                        className="border rounded p-1 w-16 text-center"
                    />
                    <span className="ml-2">/ {data.totalPages}</span>
                </div>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === data.totalPages}>
                    Siguiente
                </button>
            </div>
            <div className="ml-4">
                    <label htmlFor="limit" className="mr-2">Cartas por página:</label>
                    <input
                        type="number"
                        id="limit"
                        value={cardsPerPage}
                        onChange={handleLimitChange}
                        className="border rounded p-1 w-16"
                    />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} card={selectedCard} />
        </div>
    );
};

export default CardList;
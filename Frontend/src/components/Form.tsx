import { useEffect, useState } from "react";
import { CardModel } from "../utilities/Card.model";
import { useNavigate, useParams } from "react-router-dom";
import ModalForm from "./ModalForm";


const CardForm = () => {
    const { _id } = useParams<{ _id: string }>();
    const [card, setCard] = useState<CardModel>()
    const [id, setId] = useState("")
    const [cmc, setCmc] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [manaCost, setManaCost] = useState("");
    const [name, setName] = useState("");
    const [power, setPower] = useState("");
    const [rarity, setRarity] = useState("");
    const [set, setSet] = useState("");
    const [text, setText] = useState("");
    const [toughness, setToughness] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCard = async () => {
            const response = await fetch(`http://localhost:3000/api/cards/${_id}`);
            const data = await response.json();
            if (data) {
                setCard(data);
                setId(data.id)
                setCmc(data.cmc)
                setImageUrl(data.imageUrl)
                setManaCost(data.manaCost)
                setName(data.name)
                setPower(data.power || "N/A")
                setRarity(data.rarity)
                setSet(data.set)
                setText(data.text)
                setToughness(data.toughness || "N/A")
                setType(data.type)
            }
        };

        if (_id) {
            fetchCard();
        }
    }, [_id]);



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newCard: CardModel = {
            id,
            cmc,
            imageUrl,
            manaCost,
            name,
            power,
            rarity,
            set,
            text,
            toughness,
            type,
        };

        try {
            const method = card ? 'PUT' : 'POST';
            const url = card ? `http://localhost:3000/api/cards/${_id}` : 'http://localhost:3000/api/cards/';
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCard),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Error en la creación/actualización de la carta'}`);
            }
            navigate("/")
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleInput = (e: Event, setFunction: Function) => {
        const target = e.target as HTMLInputElement
        setFunction(target.value)
    }

    const handleCancel = () => {
        navigate("/")
    }
    return (
        <div className="flex items-center">
            <div className="p-4 bg-gray-900 rounded-lg shadow-md text-white">
                <h2 className="text-2xl font-bold text-center mb-4">{card ? "Modificar Carta" : "Crear Nueva Carta"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => handleInput(e, setName)}
                                className="p-2 border w-80 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="set">Set:</label>
                            <input
                                type="text"
                                id="set"
                                value={set}
                                onChange={(e) => handleInput(e, setSet)}
                                className="p-2 border w-40 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="cmc">Coste de Mana:</label>
                            <input
                                type="number"
                                id="cmc"
                                value={cmc}
                                onChange={(e) => handleInput(e, setCmc)}
                                className="p-2 border w-50 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="manaCost">Coste de Mana (Texto):</label>
                            <input
                                type="text"
                                id="manaCost"
                                value={manaCost}
                                onChange={(e) => handleInput(e, setManaCost)}
                                className="p-2 border w-50 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="power">Poder:</label>
                            <input
                                type="text"
                                id="power"
                                value={power}
                                onChange={(e) => handleInput(e, setPower)}
                                className="p-2 border w-50 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="toughness">Resistencia:</label>
                            <input
                                type="text"
                                id="toughness"
                                value={toughness}
                                onChange={(e) => handleInput(e, setToughness)}
                                className="p-2 border w-50 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="type">Tipo:</label>
                            <input
                                type="text"
                                id="type"
                                value={type}
                                onChange={(e) => handleInput(e, setType)}
                                className="p-2 border w-72 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col mx-3">
                            <label className="text-lg font-semibold" htmlFor="rarity">Rareza:</label>
                            <select
                                value={rarity}
                                onChange={(e) => handleInput(e, setRarity)}
                                className="border w-48 rounded p-2"
                            >
                                <option value="Common">Común</option>
                                <option value="Uncommon">Poco común</option>
                                <option value="Rare">Rara</option>
                                <option value="Mythic Rare">Mítica Rara</option>
                                <option value="Special">Especial</option>
                                <option value="Basic Land">Tierra Basica</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mx-3">
                        <label className="text-lg font-semibold" htmlFor="imageUrl">URL de Imagen:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => handleInput(e, setImageUrl)}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col mx-3">
                        <label className="text-lg font-semibold" htmlFor="text">Texto:</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => handleInput(e, setText)}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex justify-between mt-6 mx-3">
                        <button type="button" onClick={handleCancel} className="text-white py-2 px-4 rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="text-white py-2 px-4 rounded hover:bg-blue-700">
                            {card ? "Actualizar Carta" : "Crear Carta"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="mx-5">
                <ModalForm name={name} imageUrl={imageUrl} rarity={rarity} manaCost={manaCost}
                    type={type} set={set} power={power} toughness={toughness} />
            </div>
        </div>
    );
};

export default CardForm;
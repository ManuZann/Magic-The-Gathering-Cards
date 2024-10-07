import { FunctionComponent } from "preact";

interface ModalProps{
    name: string;
    imageUrl: string;
    rarity: string;
    manaCost: string;
    type: string;
    set: string;
    power: string;
    toughness: string;
}

const ModalForm: FunctionComponent<ModalProps> = ({name, imageUrl, rarity, manaCost, type, set, power, toughness}) => {
    return (
        <div className="inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-3xl w-full flex relative">
                <div className="flex-shrink-0">
                    <img src={imageUrl} alt={name} className="w-64 h-80 object-cover rounded-md" />
                </div>
                <div className="text-white pl-10">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <p className="mt-4"><strong>Rareza:</strong> {rarity}</p>
                    <p className="mt-2"><strong>Costo de maná:</strong> {manaCost || 'N/A'}</p>
                    <p className="mt-2"><strong>Tipo:</strong> {type || 'N/A'}</p>
                    <p className="mt-2"><strong>Set:</strong> {set || 'N/A'}</p>
                    <div className="mt-2">
                        <p className="inline"><strong>Poder:</strong> {power || 'N/A'}</p>
                        <span className="mx-2"> |</span>
                        <p className="inline"><strong>Tenacidad:</strong> {toughness || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForm
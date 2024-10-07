import { FunctionComponent } from 'preact';

interface CardProps {
    id: string;
    name: string;
    imageUrl: string;
}

const Card: FunctionComponent<CardProps> = ({name, imageUrl }) => {
    return (
        <div className="w-64 p-4 rounded">
            <h3 className="text-lg font-semibold"><u>{name}</u></h3>
            <img src={imageUrl} alt={name} className="mt-2 w-full h-auto rounded" />
        </div>
    );
};

export default Card;
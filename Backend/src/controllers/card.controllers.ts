import { Request, Response } from 'express';
import Card from '../models/Card.model';
import { fetchStoreCards } from '../services/card.service';


export const getCards = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const name = req.query.name as string;
  const rarity = req.query.rarity as string;

  try {
    const query: any = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (rarity) {
      query.rarity = rarity;
    }

    const cards = await Card.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCards = await Card.countDocuments(query);

    res.json({
      page,
      totalPages: Math.ceil(totalCards / limit),
      totalCards,
      cards,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCardById = async ( req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.id)
    if(!card){
      res.status(404).json({message: "Card not founded"})
      return
    }
    res.status(200).json(card)
  } catch (error) {
    console.log(error);
    
    res.status(400).json(error)
  }
}


export const createCard = async (req: Request, res: Response) => {
const newCard = new Card(req.body);
try {
  const savedCard = await newCard.save();
  res.status(201).json(savedCard);
} catch (error) {
  res.status(400).json({ error });
}
};


export const updateCard = async (req: Request, res: Response) => {
try {
  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedCard);
} catch (error) {
  res.status(400).json({ error });
}
};


export const deleteCard = async (req: Request, res: Response) => {
try {
  await Card.findByIdAndDelete(req.params.id);
  res.status(204).send();
} catch (error) {
  res.status(400).json({ error });
}
};


export const syncCards = async (req: Request, res: Response) => {
try {
  await fetchStoreCards();
  res.status(200).json({ message: 'Cards synchronized successfully' });
} catch (error) {
  res.status(500).json({ error });
}
};
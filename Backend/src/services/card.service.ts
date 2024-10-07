import axios from "axios";
import Card from "../models/Card.model";

const API_URL = "https://api.magicthegathering.io/v1/cards";

export const fetchStoreCards = async () => {
  try {
    for (let page = 1; page <= 10; page++) {
      const response = await axios.get(`${API_URL}?page=${page}`);
      const cards = response.data.cards;

      for (const card of cards) {
        const {
          id,
          name,
          manaCost,
          cmc,
          colors,
          colorIdentity,
          type,
          types,
          subtypes,
          rarity,
          set,
          setName,
          text,
          artist,
          power,
          toughness,
          layout,
          multiverseid,
          imageUrl,
          variations,
          foreignNames,
          printings,
          originalText,
          originalType,
          legalities,
        } = card;
        if (multiverseid) {
          await Card.updateOne(
            { id },
            {
              name,
              manaCost,
              cmc,
              colors,
              colorIdentity,
              type,
              types,
              subtypes,
              rarity,
              set,
              setName,
              text,
              artist,
              power,
              toughness,
              layout,
              multiverseid,
              imageUrl,
              variations,
              foreignNames,
              printings,
              originalText,
              originalType,
              legalities,
            },
            { upsert: true }
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

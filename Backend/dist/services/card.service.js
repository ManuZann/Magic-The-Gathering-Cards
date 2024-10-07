"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStoreCards = void 0;
const axios_1 = __importDefault(require("axios"));
const Card_model_1 = __importDefault(require("../models/Card.model"));
const API_URL = "https://api.magicthegathering.io/v1/cards";
const fetchStoreCards = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let page = 1; page <= 10; page++) {
            const response = yield axios_1.default.get(`${API_URL}?page=${page}`);
            const cards = response.data.cards;
            for (const card of cards) {
                const { id, name, manaCost, cmc, colors, colorIdentity, type, types, subtypes, rarity, set, setName, text, artist, power, toughness, layout, multiverseid, imageUrl, variations, foreignNames, printings, originalText, originalType, legalities, } = card;
                if (multiverseid) {
                    yield Card_model_1.default.updateOne({ id }, {
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
                    }, { upsert: true });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchStoreCards = fetchStoreCards;

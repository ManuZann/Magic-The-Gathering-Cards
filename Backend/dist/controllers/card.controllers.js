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
exports.syncCards = exports.deleteCard = exports.updateCard = exports.createCard = exports.getCardById = exports.getCards = void 0;
const Card_model_1 = __importDefault(require("../models/Card.model"));
const card_service_1 = require("../services/card.service");
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name;
    const rarity = req.query.rarity;
    try {
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (rarity) {
            query.rarity = rarity;
        }
        const cards = yield Card_model_1.default.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalCards = yield Card_model_1.default.countDocuments(query);
        res.json({
            page,
            totalPages: Math.ceil(totalCards / limit),
            totalCards,
            cards,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getCards = getCards;
const getCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const card = yield Card_model_1.default.findById(req.params.id);
        if (!card) {
            res.status(404).json({ message: "Card not founded" });
            return;
        }
        res.status(200).json(card);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getCardById = getCardById;
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCard = new Card_model_1.default(req.body);
    try {
        const savedCard = yield newCard.save();
        res.status(201).json(savedCard);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createCard = createCard;
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCard = yield Card_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCard);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.updateCard = updateCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Card_model_1.default.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.deleteCard = deleteCard;
const syncCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, card_service_1.fetchStoreCards)();
        res.status(200).json({ message: 'Cards synchronized successfully' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.syncCards = syncCards;

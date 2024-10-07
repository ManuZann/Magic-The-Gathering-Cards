"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const foreignNameSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    flavor: { type: String },
    imageUrl: { type: String, required: true },
    language: { type: String, required: true },
    identifiers: {
        scryfallId: { type: String, required: true },
        multiverseId: { type: Number, required: true }
    },
    multiverseid: { type: Number, required: true }
}, { _id: false });
const legalitySchema = new mongoose_1.default.Schema({
    format: { type: String, required: true },
    legality: { type: String, required: true },
});
const cardSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String, required: true },
    manaCost: { type: String, required: true },
    cmc: { type: Number, required: true },
    colors: { type: [String] },
    colorIdentity: { type: [String] },
    type: { type: String, required: true },
    types: { type: [String] },
    subtypes: { type: [String] },
    rarity: { type: String, required: true },
    set: { type: String, required: true },
    setName: { type: String },
    text: { type: String, required: true },
    artist: { type: String },
    power: { type: String, required: true },
    toughness: { type: String, required: true },
    layout: { type: String },
    multiverseid: { type: Number },
    imageUrl: { type: String, required: true },
    variations: { type: [String] },
    foreignNames: { type: [foreignNameSchema] },
    printings: { type: [String] },
    originalText: { type: String },
    originalType: { type: String },
    legalities: { type: [legalitySchema] }
});
const Card = mongoose_1.default.model('Card', cardSchema);
exports.default = Card;

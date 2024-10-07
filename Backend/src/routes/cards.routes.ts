import { Router } from 'express';
import {getCards, createCard, updateCard, deleteCard, syncCards, getCardById } from '../controllers/card.controllers';
import Card from '../models/Card.model';

const cardRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Operations related to Magic the Gathering cards
 */

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all cards with pagination
 *     tags: [Cards]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *         required: false
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of cards to retrieve per page
 *         required: false
 *         example: 10
 *     responses:
 *       200:
 *         description: List of cards with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalCards:
 *                   type: integer
 *                 cards:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error fetching cards
 */
cardRouter.get('/', getCards);

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Obtiene una carta por ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la carta que se desea obtener
 *     responses:
 *       200:
 *         description: Carta encontrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "614c1b8eaae2f53a7cbe25b7"
 *                 cmc:
 *                   type: integer
 *                   example: 3
 *                 imageUrl:
 *                   type: string
 *                   example: "https://example.com/image.png"
 *                 manaCost:
 *                   type: string
 *                   example: "{2}{G}"
 *                 name:
 *                   type: string
 *                   example: "Forest"
 *                 power:
 *                   type: string
 *                   example: "3"
 *                 rarity:
 *                   type: string
 *                   example: "Common"
 *                 set:
 *                   type: string
 *                   example: "Core Set 2021"
 *                 text:
 *                   type: string
 *                   example: "Tap: Add {G}."
 *                 toughness:
 *                   type: string
 *                   example: "4"
 *                 type:
 *                   type: string
 *                   example: "Land"
 *       404:
 *         description: Carta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carta no encontrada"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener la carta"
 */
cardRouter.get('/:id', getCardById)

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card created successfully
 *       400:
 *         description: Error creating card
 */
cardRouter.post('/', createCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   put:
 *     summary: Update a card by ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the card to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Card updated successfully
 *       400:
 *         description: Error updating card
 */
cardRouter.put('/:id', updateCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Delete a card by ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the card to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Card deleted successfully
 *       400:
 *         description: Error deleting card
 */
cardRouter.delete('/:id', deleteCard);

/**
 * @swagger
 * /api/cards/sync:
 *   post:
 *     summary: Synchronize cards from external API
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Cards synchronized successfully
 *       500:
 *         description: Error synchronizing cards
 */
cardRouter.post('/sync', syncCards);

export default cardRouter;
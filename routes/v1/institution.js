import express from "express";

import {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
} from "../../controllers/v1/institution.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Institution:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Institution Name"
 *         region:
 *           type: string
 *           example: "Region Name"
 *         country:
 *           type: string
 *           example: "Country Name"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 */

/**
 * @swagger
 * /api/v1/institutions:
 *   post:
 *     summary: Create a new institution
 *     tags:
 *       - Institution
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institution'
 *     responses:
 *       '201':
 *         description: Institution successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Institution successfully created"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Institution'
 *       '400':
 *         description: Institution with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Institution with the same name already exists"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post("/", createInstitution);

/**
 * @swagger
 * /api/v1/institutions:
 *   get:
 *     summary: Get all institutions
 *     tags:
 *       - Institution
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Institution'
 *       '404':
 *         description: No institutions found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No institutions found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/", getInstitutions);

/**
 * @swagger
 * /api/v1/institutions/{id}:
 *   get:
 *     summary: Get an institution by id
 *     tags:
 *       - Institution
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The institution id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       '404':
 *         description: No institution found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No institution with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/:id", getInstitution);

/**
 * @swagger
 * /api/v1/institutions/{id}:
 *   put:
 *     summary: Update an institution by id
 *     tags:
 *       - Institution
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The institution id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institution'
 *     responses:
 *       '200':
 *         description: Institution successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Institution with the id: {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Institution'
 *       '404':
 *         description: No institution found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No institution with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put("/:id", updateInstitution);

/**
 * @swagger
 * /api/v1/institutions/{id}:
 *   delete:
 *     summary: Delete an institution by id
 *     tags:
 *       - Institution
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The institution id
 *     responses:
 *       '200':
 *         description: Institution successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Institution with the id: {id} successfully deleted"
 *       '404':
 *         description: No institution found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No institution with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.delete("/:id", deleteInstitution);

export default router;

import { Prisma } from "@prisma/client";

import institutionRepository from "../../repositories/institutionRepository.js";

const createInstitution = async (req, res) => {
  try {
    await institutionRepository.create(req.body);
    const newInstitutions = await institutionRepository.findAll({}, "id", "asc");
    return res.status(201).json({
      message: "Institution successfully created",
      data: newInstitutions,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          message: "Institution with the same name already exists",
        });
      }
    } else {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
};

const getInstitutions = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
      region: req.query.region || undefined,
      country: req.query.country || undefined,
    };

    // Extract the sortBy and sortOrder parameters from the query
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Retrieve institutions based on the filters, sorted by the specified column and order
    const institutions = await institutionRepository.findAll(
      filters,
      sortBy,
      sortOrder
    );

    // Check if there are no institutions
    if (!institutions) {
      return res.status(404).json({ message: "No institutions found" });
    }

    return res.status(200).json({
      data: institutions,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getInstitution = async (req, res) => {
  try {
    const institution = await institutionRepository.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: institution,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateInstitution = async (req, res) => {
  try {
    let institution = await institutionRepository.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }
    institution = await institutionRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Institution with the id: ${req.params.id} successfully updated`,
      data: institution,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          message: "Institution with the same name already exists",
        });
      }
    } else {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
};

const deleteInstitution = async (req, res) => {
  try {
    const institution = await institutionRepository.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }
    await institutionRepository.delete(req.params.id);
    return res.json({
      message: `Institution with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
};

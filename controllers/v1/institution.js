import { PrismaClient, Prisma } from "@prisma/client";

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Add this code under const prisma = new PrismaClient();
const createInstitution = async (req, res) => {
  // Try/catch blocks are used to handle exceptions
  try {
    // Create a new institution
    await prisma.institution.create({
      // Data to be inserted
      data: {
        name: req.body.name,
        region: req.body.region,
        country: req.body.country,
      },
    });

    // Get all institutions from the institution table
    const newInstitutions = await prisma.institution.findMany();

    // Send a JSON response
    return res.status(201).json({
      message: "Institution successfully created",
      data: newInstitutions,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      {
        if (err.code === "P2002") {
          return res.status(409).json({
            message: "Institution with the same name already exists",
          });
        }
      }
    } else {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
};

// Add this code under the createInstitution function
const getInstitutions = async (req, res) => {
  try {
    const institutions = await prisma.institution.findMany();

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

// Add this code under the getInstitutions function
const getInstitution = async (req, res) => {
  try {
    const institution = await prisma.institution.findUnique({
      where: { id: req.params.id },
    });

    // Check if there is no institution
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

// Add this code under the getInstitution function
const updateInstitution = async (req, res) => {
  try {
    // Find the institution by id
    let institution = await prisma.institution.findUnique({
      where: { id: req.params.id },
    });

    // Check if there is no institution
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }

    // Update the institution
    institution = await prisma.institution.update({
      where: { id: req.params.id },
      data: {
        // Data to be updated
        name: req.body.name,
        region: req.body.region,
        country: req.body.country,
      },
    });

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

// Add this code under the updateInstitution function
const deleteInstitution = async (req, res) => {
  try {
    const institution = await prisma.institution.findUnique({
      where: { id: req.params.id },
    });

    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }

    await prisma.institution.delete({
      where: { id: req.params.id },
    });

    return res.json({
      message: `Institution with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Add this code under the deleteInstitution function
export {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
};

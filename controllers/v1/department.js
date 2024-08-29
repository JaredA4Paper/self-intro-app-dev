import { PrismaClient, Prisma } from "@prisma/client";

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Add this code under const prisma = new PrismaClient();
const createDepartment = async (req, res) => {
  // Try/catch blocks are used to handle exceptions
  try {
    // Create a new department
    await prisma.department.create({
      // Data to be inserted
      data: {
        name: req.body.name,
        region: req.body.region,
        country: req.body.country,
      },
    });

    // Get all departments from the department table
    const newDepartments = await prisma.department.findMany();

    // Send a JSON response
    return res.status(201).json({
      message: "Department successfully created",
      data: newDepartments,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      {
        if (err.code === "P2002") {
          return res.status(409).json({
            message: "Department with the same name already exists",
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

// Add this code under the createDepartment function
const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();

    // Check if there are no departments
    if (!departments) {
      return res.status(404).json({ message: "No departments found" });
    }

    return res.status(200).json({
      data: departments,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Add this code under the getDepartments function
const getDepartment = async (req, res) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
    });

    // Check if there is no department
    if (!department) {
      return res.status(404).json({
        message: `No department with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: department,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Add this code under the getDepartment function
const updateDepartment = async (req, res) => {
  try {
    // Find the department by id
    let department = await prisma.department.findUnique({
      where: { id: req.params.id },
    });

    // Check if there is no department
    if (!department) {
      return res.status(404).json({
        message: `No department with the id: ${req.params.id} found`,
      });
    }

    // Update the department
    department = await prisma.department.update({
      where: { id: req.params.id },
      data: {
        // Data to be updated
        name: req.body.name,
        region: req.body.region,
        country: req.body.country,
      },
    });

    return res.status(200).json({
      message: `Department with the id: ${req.params.id} successfully updated`,
      data: department,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          message: "Department with the same name already exists",
        });
      }
    } else {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
};

// Add this code under the updateDepartment function
const deleteDepartment = async (req, res) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
    });

    if (!department) {
      return res.status(404).json({
        message: `No department with the id: ${req.params.id} found`,
      });
    }

    await prisma.department.delete({
      where: { id: req.params.id },
    });

    return res.json({
      message: `Department with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Add this code under the deleteDepartment function
export {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
// Import the Express module
import express from "express";

// This should be declared under import express from "express";
import swaggerJSDoc from "swagger-jsdoc";

// This should be declared under import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Import the index routes module
import indexRoutes from "./routes/index.js";

// This should be declared under import indexRoutes from "./routes/index.js";
import institutionRoutes from "./routes/institution.js";

// This should be declared above app.use("/", indexRoutes);
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data

// This should be declared under app.use(urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests

// This should be declared under app.use(express.json());
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management System API",
      version: "1.0.0",
      description: "A student management system API",
      contact: {
        name: "Grayson Orr",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// This should be declared under const swaggerOptions = { ... };
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

// Use the routes module
app.use("/", indexRoutes);

// This should be declared under app.use("/", indexRoutes);
app.use("/api/institutions", institutionRoutes);

// This should be declared under app.use("/api/institutions", institutionRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // ESM için gerekli
import projectsRoutes from "./routes/projects.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ESM ortamı için __dirname elde et
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Statik dosyalar (örneğin: public/images içindekiler)
app.use("/images", express.static(path.join(__dirname, "public")));

// Routes
app.use("/projects", projectsRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Portfolio Backend with Vercel is running.");
});

// Vercel için export
export default app;

// Local development için
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

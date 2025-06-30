import express from "express";
import cors from "cors";
import path from "path";

import projectsRoutes from "./routes/projects.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Statik dosya servisi
app.use("/images", express.static(path.join(process.cwd(), "public")));

app.use("/projects", projectsRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio Backend with Telegram is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

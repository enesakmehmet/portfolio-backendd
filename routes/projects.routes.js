import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

export default router;

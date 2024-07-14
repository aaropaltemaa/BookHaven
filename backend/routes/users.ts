import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Hello User!");
});

router.post("/", (_req, res) => {
  res.send("Creating a user");
});

export default router;

import express from "express";
import { 
  getPoints, 
  addPoint, 
  deletePoint, 
  updatePoint, 
  getPointById 
} from "../Controllers/points.js";

const router = express.Router();

router.get("/", getPoints);
router.post("/add", addPoint);
router.delete("/delete/:id", deletePoint);
router.put("/update/:id", updatePoint);
router.get("/:id", getPointById); 

export default router;

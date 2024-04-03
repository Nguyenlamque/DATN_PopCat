import { Router } from "express";
import {
  create_Category,
  delete_Category,
  getAll_Category,
  getDetail_Category,
  update_Category,
} from "../Controllers/Categorys.js";
const route_Category = Router();

route_Category.get("/categorys", getAll_Category);
route_Category.post("/category", create_Category);
route_Category.get("/category/:id", getDetail_Category);
route_Category.put("/category/:id", update_Category);
route_Category.delete("/category/:id", delete_Category);

export default route_Category;

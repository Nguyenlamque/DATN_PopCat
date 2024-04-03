import express from "express";
import { signIn, signUp } from "../Controllers/Auth.js";
// import { checkPermission } from '../Middlewares/CheckPermission.js';

const routerAuth = express.Router();

routerAuth.post("/signUp", signUp);

routerAuth.post("/signIn", signIn);

export default routerAuth;

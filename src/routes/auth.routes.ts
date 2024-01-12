import { Router } from "express";
import { LoginSchema, RegisterSchema } from "../validators/auth.validator";
import validate from "../middleware/validation.middleware";
import AuthController from "../controller/auth.controller";

const router = Router();

router.post(
  "/api/v1/auth/register",
  validate(RegisterSchema),
  AuthController.register
);
router.post("/api/v1/auth/login", validate(LoginSchema), AuthController.login);
router.get("/api/v1/auth/alluser", AuthController.getalluser);

const AuthRouter = router;
export default AuthRouter;

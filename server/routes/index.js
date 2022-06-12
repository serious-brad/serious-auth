import { Router } from "express";
import { body } from "express-validator";
import authController from "../controllers/authController.js";
import userController from "../controllers/usersController.js";
import authMiddlewares from "../middlewares/authMiddlewares.js";

const router = Router();

router.route('/logout').post(authController.logout);
router.route('/login').post(
  body('email').isEmail(),
  authController.login
  );
router.route('/refresh').get(authController.refresh);
router.route('/activate/:link').get(userController.activateUser);

router.route('/users')
  .get(authMiddlewares, userController.getUsers)
  .post(
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 20 }),
    userController.createUser
  )
router.route('/users/:id')
  .get(authMiddlewares, userController.getUser)
  .put(
    authMiddlewares,
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 20 }),
    userController.updateUser
  )
  .delete(authMiddlewares, userController.deleteUser)

export default router;

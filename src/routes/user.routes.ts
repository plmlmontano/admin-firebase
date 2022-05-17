import { Router } from "express";
const router: Router = Router();

import * as usersCtrl from "../controllers/users.controllers";

router.get("/", usersCtrl.get);
router.put("/:id", usersCtrl.update);
router.post("/", usersCtrl.create);
router.delete("/:id", usersCtrl.deleteById);

export default router;
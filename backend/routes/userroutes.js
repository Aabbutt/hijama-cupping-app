const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const { hashPassword, isAdmin, jwtParse } = require("../middleware/auth");
const {
  validateUserSignup,
  validateUserLogin,
} = require("../middleware/validation");

router.get("/", [isAdmin], usercontroller.getallusers); // all users

router.post(
  "/signup",
  validateUserSignup,
  hashPassword,
  usercontroller.createuser
); // create user

router.post("/login", validateUserLogin, usercontroller.login); // login user

router.get("/me", jwtParse, usercontroller.getuserbyid); // get user by id

router.put("/update", jwtParse, usercontroller.updateuser); // update user

router.delete("/:id", isAdmin, usercontroller.destroyuser); // delete user

// New profile routes
router.post("/change-password", jwtParse, usercontroller.changePassword);
router.get("/profile", jwtParse, usercontroller.getProfile);
router.put("/profile", jwtParse, usercontroller.updateProfile);
router.post("/logout", jwtParse, usercontroller.logout);

module.exports = router;

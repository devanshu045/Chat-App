// userRoutes.js

const { register, login, getAllUser,logOut } = require("../controllers/usercontrollers");
const router = require("express").Router();



router.post("/register", register);
router.post("/login",login);
router.post("/setavatar/:id", setAvatar);
router.get('/allUser/:id',getAllUser);
router.get("/logout/:id", logOut);

module.exports = router;

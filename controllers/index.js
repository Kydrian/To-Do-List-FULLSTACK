const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const taskRoutes = require("./api/taskRoutes");
const withAuth = require("../utils/auth");

router.use("/api/users", userRoutes);
router.use("/api/tasks", taskRoutes);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/tasks", withAuth, (req, res) => {
  res.render("tasks", {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/api/tasks");
    return;
  }
  res.redirect("/login");
});

module.exports = router;

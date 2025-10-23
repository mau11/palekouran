import bcrypt from "bcryptjs";

export default function (app) {
  // export default function (app, prisma) {
  // ====== HOME ======
  app.get("/", (req, res) => {
    if (req.session.userId) {
      return res.redirect("/profile");
    }
    res.render("index.ejs");
  });

  function isLoggedIn(req, res, next) {
    if (req.session.userId) {
      return next();
    }
    res.redirect("/login");
  }

  // ====== PROFILE ======
  // app.get("/profile", isLoggedIn, async (req, res) => {
  //   try {
  //     const user = await prisma.user.findUnique({
  //       where: { id: req.session.userId },
  //     });

  //     if (!user) {
  //       req.session.destroy(() => res.redirect("/login"));
  //       return;
  //     }

  //     res.render("profile.ejs", { user });
  //   } catch (err) {
  //     console.error("Profile error:", err);
  //     res.redirect("/");
  //   }
  // });

  // ====== LOGIN ======
  app.get("/login", (req, res) => {
    const message = req.session.loginMessage || "";
    req.session.loginMessage = null;
    res.render("login.ejs", { message });
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // const user = await prisma.user.findUnique({ where: { email } });

      // if (user && (await bcrypt.compare(password, user.password))) {
      //   req.session.userId = user.id;
      //   res.redirect("/dashboard");
      // } else {
      //   req.session.loginMessage = "Invalid credentials";
      //   res.redirect("/login");
      // }
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Login failed");
    }
  });

  // ====== SIGNUP ======
  app.get("/signup", (req, res) => {
    const message = req.session.signupMessage || "";
    req.session.signupMessage = null;
    res.render("signup.ejs", { message });
  });

  app.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // const existingUser = await prisma.user.findUnique({ where: { email } });
      // if (existingUser) {
      //   req.session.signupMessage = "Email already in use";
      //   return res.redirect("/signup");
      // }

      const hashedPassword = await bcrypt.hash(password, 10);

      // const user = await prisma.user.create({
      //   data: {
      //     username,
      //     email,
      //     password: hashedPassword,
      //   },
      // });

      req.session.userId = user.id;
      res.redirect("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).send("Registration failed");
    }
  });

  // ====== LOGOUT ======
  app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) console.error("Logout error:", err);
      res.redirect("/");
    });
  });
}

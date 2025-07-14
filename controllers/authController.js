const { check, validationResult } = require("express-validator");
const User = require("../models/person");
const bcrypt = require("bcryptjs");


// GET Login Page
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    errors: [],
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
    oldInput: {email: ''}
  });
};


// GET Signup Page
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    currentPage: "SignUp",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    },
  });
};


// POST Signup
exports.postSignup = [
  // Validation Middleware
  check("firstName")
    .notEmpty().withMessage("First name is required")
    .trim()
    .isLength({ min: 2 }).withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z]+$/).withMessage("First name must contain only letters"),

  check("lastName")
    .optional({ checkFalsy: true })
    .matches(/^[a-zA-Z]*$/).withMessage("Last name must contain only letters"),

  check("email")
    .isEmail().withMessage("Email is invalid")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&_]/).withMessage("Password must contain at least one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password does not match password");
      }
      return true;
    }),
  check("terms")
    .notEmpty().withMessage("You must agree to the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must agree to the terms and conditions");
      }
      return true;
    }),

  // Controller Handler
  async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword,terms } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "SignUp",
        currentPage: "SignUp",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          terms,
        },
      });
    }

    try {
      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(422).render("auth/signup", {
          pageTitle: "SignUp",
          currentPage: "SignUp",
          isLoggedIn: false,
          errors: ["Email already exists"],
          oldInput: { firstName, lastName, email, password, confirmPassword,terms },
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Save new user
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        termsAccepted: terms === "on",
      });

      await user.save();
      res.redirect("/login");
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).render("auth/signup", {
        pageTitle: "SignUp",
        currentPage: "SignUp",
        isLoggedIn: false,
        errors: ["Something went wrong. Please try again."],
        oldInput: { firstName, lastName, email, password, confirmPassword,terms },
      });
    }
  }
];


// POST Login
exports.postLogin = async(req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "Login",
      isLoggedIn: false,
      errors: ["User not found"],
      oldInput: {
        email: email,
        password: password,
      },
    });
  }

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "Login",
      isLoggedIn: false,
      errors: ["Invalid password"],
      oldInput: {email: email}
      });
      }
      

  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log("❌ Error saving session:", err);
    } else {
      console.log("✅ Session saved to DB");
    }
    res.redirect("/");
  });
};


// POST Logout
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

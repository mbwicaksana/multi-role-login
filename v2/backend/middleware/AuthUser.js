import Users from "../../../backend/models/UserModel";

export const verifyUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res
        .st2atus(401)
        .json({ msg: "Please login into your account first." });
    }

    const user = await Users.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    req.userId = user.id;
    req.role = user.role;

    next();
  } catch (error) {
    console.error("Error in verifyUser middleware:", error); // Log for debugging
    res.status(500).json({ msg: "Internal server error." }); // Generic error response
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    // Early return for missing session ID
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ msg: "Please login into your account first." });
    }

    const user = await Users.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access Denied." });
    }

    // Proceed with admin-only actions
    next();
  } catch (error) {
    console.error("Error in adminOnly middleware:", error); // Log for debugging
    res.status(500).json({ msg: "Internal server error." }); // Generic error response
  }
};

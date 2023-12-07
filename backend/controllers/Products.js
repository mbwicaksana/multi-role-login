import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: {
          model: Users,
          attributes: ["name", "email"],
        },
      });
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getProductById = (req, res) => {};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    await Products.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Product Created." });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const updateProduct = (req, res) => {};

export const deleteProduct = (req, res) => {};

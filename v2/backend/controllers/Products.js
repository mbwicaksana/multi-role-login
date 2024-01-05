import Users from "../models/UserModel.js";
import Products from "../models/ProductModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    const options = {
      attributes: ["uuid", "name", "price"],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
      ],
    };

    if (req.role !== "admin") {
      options.where = { userId: req.userId };
    }

    const products = await Products.findAll(options);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const options = {
      attributes: ["uuid", "name", "price"],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
      ],
    };

    const product = await Products.findOne({ where: { uuid: req.params.id } });

    if (!product) return res.status(404).json({ msg: "Product Not Found." });

    if (req.role !== "admin") {
      options.where = {
        [Op.and]: [{ id: product.id }, { userId: req.userId }],
      };
    }

    const fetchedProduct = await Products.findOne(options);
    res.status(200).json(fetchedProduct);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await Products.create({
      name,
      price,
      userId: req.userId,
    });

    res.status(201).json({ msg: "Product Created", product });
  } catch (e) {
    res.status(500).json({ msg: "Error creating product." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ where: { uuid: req.params.id } });

    if (!product) return res.status(404).json({ msg: "Product Not Found." });

    const { name, price } = req.body;

    const updateOptions = {
      where: { id: product.id },
    };

    if (req.role !== "admin") {
      updateOptions.where = {
        [Op.and]: [{ id: product.id }, { userId: req.userId }],
      };
    }

    await Products.update({ name, price }, updateOptions);

    res.status(200).json({ msg: "Product Updated." });
  } catch (e) {
    res.status(500).json({ msg: "Error updating product." }); // More informative error message
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ where: { uuid: req.params.id } });

    if (!product) return res.status(404).json({ msg: "Product Not Found." });

    const deleteOptions = { where: { id: product.id } };

    if (req.role !== "admin") {
      deleteOptions.where = {
        [Op.and]: [{ id: product.id }, { userId: req.userId }],
      };
    }

    await Products.destroy(deleteOptions);

    res.status(204).json(); // No content response for successful deletion
  } catch (e) {
    res.status(500).json({ msg: "Error deleting product." }); // More informative error message
  }
};

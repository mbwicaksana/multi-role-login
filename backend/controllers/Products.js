import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

3
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
        res.status(500).json({msg: e.message});
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({msg: "Product Not Found."})
        let response;
        if (req.role === "admin") {
            response = await Products.findOne({
                attributes: ["uuid", "name", "price"],
                where: {
                    id: product.id
                },
                include: [
                    {
                        model: Users,
                        attributes: ["name", "email"],
                    },
                ],
            });
        } else {
            response = await Products.findOne({
                attributes: ["uuid", "name", "price"],
                where: {
                    [Op.and]: [{id: product.id}, {userId: req.userId}]
                },
                include: {
                    model: Users,
                    attributes: ["name", "email"],
                },
            });
        }
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
};

export const createProduct = async (req, res) => {
    const {name, price} = req.body;

    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId,
        });
        res.status(201).json({msg: "Product Created."});
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
};

export const updateProduct = (req, res) => {
};

export const deleteProduct = (req, res) => {
};

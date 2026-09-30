import { Router, Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    stock: 10,
  },
  {
    id: 2,
    name: "Headphones",
    price: 2000,
    category: "Electronics",
    stock: 25,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 1500,
    category: "Accessories",
    stock: 15,
  },
];

// GET all products
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  })
);

// Temporary 500 error route for testing
router.get(
  "/test/error",
  asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Temporary server error for testing");
  })
);

// GET product by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new AppError("Invalid product ID", 400);
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.json({
      success: true,
      data: product,
    });
  })
);

// POST new product
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, price, category, stock } = req.body;

    if (
      !name ||
      price === undefined ||
      !category ||
      stock === undefined
    ) {
      throw new AppError(
        "Name, price, category and stock are required",
        422
      );
    }

    const newProduct: Product = {
      id: products.length + 1,
      name,
      price,
      category,
      stock,
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  })
);

export default router;
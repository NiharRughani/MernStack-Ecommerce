import { Products } from "../Models/Product.js";

//add product

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, qty, imgSrc } = req.body;

    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });

    res.json({ message: "product created successfully", product });
  } catch (error) {
    res.json(error.message);
  }
};

//getproducts

export const getProducts = async (req, res) => {
  try {
    let products = await Products.find().sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// find a product by its id

export const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    let product = await Products.findById(id);

    res.json({
      message: "product fetched successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
  console.log("find product by id hit");
};

//update product by its id

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const product = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) return res.json({ message: "product not found" });

    return res.json({ message: "product is updated", product });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    let product = await Products.findByIdAndDelete(id);
    if (!product)
      return res.json({
        message: "specific product does not exist",
        success: false,
      });
    res.json({
      message: "specific product is deleted",
      success: true,
      product,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

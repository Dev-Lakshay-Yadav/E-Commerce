import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//  add a new product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// fetch all products
export const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Fetch karne mein Error Occured",
    });
  }
};

// edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Edit karne k liye Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price ==='' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    
    await findProduct.save()
    res.status(200).json({
        success : true,
        data : findProduct
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Edit karne mein Error Occured",
    });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)

    if(!product) return res.status(404).json({
        success : false,
        message : "Delete karne ke liye Product not found"
    })

    res.status(200).json({
        success : true,
        message : "Product delete successfully"
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Delete karne mein Error Occured",
    });
  }
};
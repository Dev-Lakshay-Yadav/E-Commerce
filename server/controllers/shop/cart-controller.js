import Cart from "../../models/Cart.js"
import Product from "../../models/Product.js"  

export const addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        cart.items.push({ productId, quantity });
      } else {
        cart.items[findCurrentProductIndex].quantity += quantity;
      }
  
      await cart.save();
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

  export const fetchCartItems = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // If no userId is provided, return an empty cart response
      if (!userId) {
        return res.status(200).json({
          success: true,
          data: {
            items: [],
          },
        });
      }
  
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      // If the cart doesn't exist, return an empty cart response
      if (!cart) {
        return res.status(200).json({
          success: true,
          data: {
            items: [],
          },
        });
      }
  
      // Filter out invalid items where the productId is missing
      const validItems = cart.items.filter(
        (productItem) => productItem.productId
      );
  
      // If there are invalid items, update the cart
      if (validItems.length < cart.items.length) {
        cart.items = validItems;
        await cart.save();
      }
  
      // Populate cart items
      const populateCartItems = validItems.map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      }));
  
      // Return the cart data, even if it's empty
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the cart.",
      });
    }
  };
  
export const updateCartItemQty = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Cart item not present !",
        });
      }
  
      cart.items[findCurrentProductIndex].quantity = quantity;
      await cart.save();
  
      await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };


export const deleteCartItem = async(req,res)=>{
    try{
        const {userId,productId} = req.params

        if(!userId || !productId ){
            return res.status(400).json({
                success : false,
                message : "Invalid data provided!"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price salePrice"
        })

        if(!cart){
            return res.status(404).json({
                success : false,
                message : "Cart not found!"
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)

        await cart.save()

        await cart.populate({
            path : 'items.productId',
            select : "image title price salePrice"
        })

        const populateCartItems = cart.items.map(item => ({
            productId : item.productId ?  item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : 'Product not found',
            price : item.productId ? item.productId.price : null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity,
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Error"
        })
    }
}
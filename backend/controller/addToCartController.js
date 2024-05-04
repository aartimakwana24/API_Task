import addToCart from "../modal/addToCart.js";

export const addToCartController = async (request, response) => {
    try {
        const userId = request.session.userId;
        // console.log("userId-->",userId);
        const { productId } = request.body;
        // console.log("productId--->",productId);
        const addToCartData = new addToCart({
            userId: userId,
            productId: productId
        });
        request.session.productId = productId;
        await addToCartData.save();
        response.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
}
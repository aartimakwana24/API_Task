import productModal from "../modal/productModal.js";

import { fileURLToPath } from 'url';
import path from 'path';

export const productDetailsController = async (request, response) => {
    try {
        var __filename = fileURLToPath(import.meta.url);
        var __dirname = path.dirname(__filename).replace("\\controller", "");
        const { productName, productDetails, productPrice, ratings, addToCart, Quantity, email } = request.body;
        var filename = request.files.productImage;
        var fileName = new Date().getTime() + filename.name;
        var pathName = path.join(__dirname, "/public/assets/images/", fileName);

        filename.mv(pathName, async (error) => {
            if (error) {
                console.log(error);
                response.status(203).json({ message: "Error while Image in productController" });
            } else {
                try {
                    const productData = await productModal.create({
                        productName: productName,
                        productDetails: productDetails,
                        productPrice: productPrice,
                        ratings: ratings,
                        Quantity: Quantity,
                        addToCart: addToCart,
                        productImage: fileName,
                    });

                    await productData.save();
                    response.status(201).json({ productData: productData, msg: "Data Inserted Successfully!" });
                } catch (error) {
                    console.log("Error in passesDataController: ", error);
                    response.status(500).json({ status: false, message: "Internal Server Error" });
                }
            }
        });

    } catch (error) {
        console.log("Error while image uploding", error);
        response.status(500).json({ status: false, message: "Internal Server Error" });
    }
}


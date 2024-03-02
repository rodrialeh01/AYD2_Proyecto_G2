import mongoose, {Schema, model} from 'mongoose';

const productSchema = new Schema(
    {
        pathImage: String,
        name: String,
        description: String,
        price: Number,
        stock: Number,
        idUser: {type : mongoose.Schema.Types.ObjectId, ref: 'users'},
    },
    {
        timestamps: true,
    }
);

const Product = model('products', productSchema);

export default Product;
import {Schema, model} from 'mongoose';

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

export default Product = model('products', productSchema);
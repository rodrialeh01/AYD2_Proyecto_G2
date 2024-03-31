import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        price: { type: Number, required: true },
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        quantity: { type: Number, default: 1 },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        phone: { type: Number, required: true}
    },
    { 
        timestamps: true 
    }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
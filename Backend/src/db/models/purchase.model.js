import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    },
    { 
        timestamps: true 
    }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
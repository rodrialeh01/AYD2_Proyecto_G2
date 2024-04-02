import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const paySchema = new mongoose.Schema(
    {
        purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' },
        method: {type: Number, required: true},
        amount: {type: Number, required: true},
        address: {type: String, required: true},
        nit: {type: String, required: true},
        name: {type: String, required: true},
        card_number: { type: String, require:false, minlength: 3, maxlength: 1024  },
        card_name: { type: String, require:false },
        month: { type: Number, require:false },
        year: { type: Number, require:false },
        cvv: { type: String, require:false, minlength: 4, maxlength: 4 },
    },
    { timestamps: true }
);

paySchema.methods.encryptCard = async (card_number) => {
    const salt = await bcrypt.genSalt(5);
    return bcrypt.hash(card_number, salt);
};

paySchema.methods.validateCard = async (card_number, card_numberDB) => {
    return bcrypt.compare(card_number, card_numberDB);
};

const Pay = mongoose.model('Pay', paySchema);
export default Pay;
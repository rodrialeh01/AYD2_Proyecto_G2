import mongoose, { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
    {
        idUser: {type : mongoose.Schema.Types.ObjectId, ref: 'users'},
        idProduct: {type : mongoose.Schema.Types.ObjectId, ref: 'products'},
        comment: String,
        rating: Number,
    },
    {
        timestamps: true,
    }
);

export const Review = model('reviews', reviewSchema);
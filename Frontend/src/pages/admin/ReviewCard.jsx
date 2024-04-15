import React from "react";
import Service from '../../Service/Service'
import { useEffect, useState } from "react";
import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";

const ReviewCard = ({index, review}) => {

    console.log(review);
    

    //Delete a review
    const deleteReview = async (id) => {
        try {
            await Service.deleteReview(id);
            console.log("Review eliminado");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const renderStars = (rating, onClick = null) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <span key={i} className={i <= rating ? "text-yellow-500 cursor-pointer" : "text-gray-300 cursor-pointer"} onClick={() => onClick && onClick(i)}>
              <FaStar />
            </span>
          );
        }
        return stars;
      };

      const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
      };


    return (
        <>
            <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
               
                <div class="mt-4 px-5 pb-5">
                    <a >
                    <h5 class="text-xl tracking-tight text-slate-900">{review.name}</h5>
                    <p>{review.description}</p>
                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span class="text-3xl font-bold text-slate-900">{review.comment}</span>
                    </p>
                </div>
                    
                  <div className="flex mr-2">{renderStars(review.rating)}</div>
                  <p className="flex-shrink-0">{formatDate(review.createdAt)}</p>
                    {/*Agregar botón para eliminar un producto*/}
                    <button class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    data-test-id={"cypress-button-delete-"+index}
                    
                    onClick={() => {deleteReview(review._id)}}>
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReviewCard;
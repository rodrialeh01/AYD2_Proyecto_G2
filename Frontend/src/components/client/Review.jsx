import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useState } from "react";

function Review() {
  const [comments, setComments] = useState([
    {
      photo:
        "https://fotografias.antena3.com/clipping/cmsimages02/2018/11/06/150D7F93-4C51-4DA6-9B11-550FAFE0C92A/98.jpg?crop=1066,600,x80,y0&width=1900&height=1069&optimize=high&format=webply",
      name: "John Doe",
      comment: "¡Excelente producto! Muy cómodos.",
      rating: 5,
      date: "2023-03-01",
    },
    {
      photo:
        "https://fotografias.antena3.com/clipping/cmsimages02/2018/11/06/150D7F93-4C51-4DA6-9B11-550FAFE0C92A/98.jpg?crop=1066,600,x80,y0&width=1900&height=1069&optimize=high&format=webply",
      name: "Jane Doe",
      comment: "Buena calidad, pero el envío tardó más de lo esperado.",
      rating: 4,
      date: "2023-03-02",
    },
  ]);

  // Función para renderizar las estrellas de valoración.
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        >
          <FaStar />
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-black mb-4">Valoraciones</h2>
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <>
          <div
            key={index}
            className="bg-white p-4 rounded-lg text-black relative"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              {/* Botón Editar */}
              <button
                aria-label="Editar comentario"
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleEdit(comment.id)}
              >
                <FiEdit className="text-gray-600 w-5 h-5" />
              </button>

              {/* Botón Eliminar */}
              <button
                aria-label="Eliminar comentario"
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleDelete(comment.id)}
              >
                <FiTrash className="text-gray-600 w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mb-2">
              <div className="flex-shrink-0">
                <img
                  src={comment.photo}
                  alt={comment.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="mb-0 flex items-center">
                  <div className="flex mr-2">{renderStars(comment.rating)}</div>
                  <p className="flex-shrink-0">{comment.date}</p>
                </div>
                <div className="font-semibold">{comment.name}</div>
              </div>
            </div>
            <p className="mb-4">{comment.comment}</p>
          </div>
          <hr />
          </>
        ))}
      </div>
    </div>
  );
}

export default Review;

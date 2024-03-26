import { FaStar, FaRegStarHalf, FaRegStar } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import Service from "../../Service/Service";
import toast, { Toaster } from "react-hot-toast";

function Review({ id }) {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [editId, setEditId] = useState(null);

  // Función para abrir el modal de edición
  const handleEdit = (id) => {
    const reviewToEdit = comments.find((comment) => comment._id === id);
    setEditId(id);
    setEditRating(reviewToEdit.rating);
    setEditComment(reviewToEdit.comment);
    setEditModalVisible(true);
  };

  // Función para manejar la edición de una valoración
  const handleEditSubmit = () => {
    const updatedReview = {
      rating: editRating,
      comment: editComment,
      idProduct: id,
      idUser: usuario.id,
    };
    Service.updateReview(editId, updatedReview)
      .then((updateRev) => {
        // Actualizar la lista de comentarios o recargar la página
        console.log(updateRev.data);
        setComments(
          comments.map((comment) =>
            comment._id === editId ? updateRev.data : comment
          )
        );
        setEditModalVisible(false);
        // Limpiar el formulario
        setEditRating(0);
        setEditComment("");
        toast.success("Valoración actualizada con éxito");
      })
      .catch((error) => console.log(error));
  };

  const usuario = JSON.parse(localStorage.getItem("data_user"));

  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Manejar cambio en el comentario
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ rating, comment });
    const rev = {
      rating: rating,
      comment: comment,
      idProduct: id,
      idUser: usuario.id,
    };
    Service.createReview(rev).then((newReview) => {
      setComments([...comments, newReview.data]);
      console.log(newReview);
      setShowModal(false);
      setRating(0);
      setComment("");
      toast.success("Valoración agregada con éxito");
    });
  };

  useEffect(() => {
    Service.getReviews(id)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  const renderStars = (rating, onClick = null) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= rating
              ? "text-yellow-500 cursor-pointer"
              : "text-gray-300 cursor-pointer"
          }
          onClick={() => onClick && onClick(i)}
        >
          <FaStar />
        </span>
      );
    }
    return stars;
  };

  const handleDelete = (id, idUser) => {
    if (idUser === usuario.id) {
      Service.deleteReview(id).then(() => {
        const updatedComments = comments.filter(
          (comment) => comment._id !== id
        );
        setComments(updatedComments);
        toast.success("Valoración eliminada con éxito");
      });
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} gutter={8} />
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-black mb-4">Valoraciones</h2>
        <button
          className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
          onClick={() => setShowModal(true)}
        >
          Calificar este producto
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black  text-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg">
              <h3 className="text-lg font-semibold">Deja tu valoración</h3>
              <div className="flex my-2">
                {renderStars(rating, handleRatingChange)}
              </div>
              <textarea
                className="w-full border rounded p-2 my-2"
                placeholder="Deja un comentario..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button
                className="bg-violet-800 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Enviar
              </button>
              <button
                className="bg-gray-200 text-black ml-2 py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {editModalVisible && (
          <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg">
              <h3 className="text-lg font-semibold">Editar tu valoración</h3>
              <div className="flex my-2">
                {renderStars(editRating, setEditRating)}
              </div>
              <textarea
                className="w-full border rounded p-2 my-2"
                placeholder="Edita tu comentario..."
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              ></textarea>
              <button
                className="bg-violet-800 text-white font-semibold py-2 px-4 rounded"
                onClick={handleEditSubmit}
              >
                Actualizar
              </button>
              <button
                className="bg-gray-200 text-black ml-2 py-2 px-4 rounded"
                onClick={() => setEditModalVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment, index) => (
            <>
              <div key={index} className=" p-4 rounded-lg text-black relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  {/* <button
                aria-label="Editar comentario"
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleEdit(comment.id)}
              >
                <FiEdit className="text-gray-600 w-5 h-5" />
              </button>

              <button
                aria-label="Eliminar comentario"
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleDelete(comment.id)}
              >
                <FiTrash className="text-gray-600 w-5 h-5" />
              </button> */}

                  {/* hablitar botones de editar y eliminar solo si coincide con el id de usuario logueado */}
                  {comment.idUser._id === usuario.id && (
                    <>
                      <button
                        aria-label="Editar comentario"
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => handleEdit(comment._id)}
                      >
                        <FiEdit className="text-gray-600 w-5 h-5" />
                      </button>

                      <button
                        aria-label="Eliminar comentario"
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() =>
                          handleDelete(comment._id, comment.idUser._id)
                        }
                      >
                        <FiTrash className="text-gray-600 w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex flex-col lg:flex-row gap-4 mb-2">
                  {/* <div className="flex-shrink-0">
                <img
                  src={comment.photo}
                  alt={comment.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div> */}
                  <div className="flex-grow">
                    <div className="mb-0 flex items-center">
                      <div className="flex mr-2">
                        {renderStars(comment.rating)}
                      </div>
                      <p className="flex-shrink-0">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    <div className="font-semibold">{comment.idUser.name}</div>
                  </div>
                </div>
                <p className="mb-0">{comment.comment}</p>
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Review;

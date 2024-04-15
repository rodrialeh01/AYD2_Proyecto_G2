import { useEffect, useState } from "react";
import Service from "../../Service/Service";
import ReviewCard from "./ReviewCard";

const HomeReviews = () => {


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        Service.getAllRevies()
        .then((res) => {
            setReviews(res.data);
            console.log(res.data);
        })
    }, []);

    return (
        <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide bg-silver">
            <div className="pb-4">
                <h1 className="text-black text-3xl font-semibold">
                Reviews de los Usuarios
                </h1>
                <div className="flex flex-wrap gap-4">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} index={index} review={review}/>))}
                </div>
            </div>
        </div>
    );
}

export default HomeReviews;
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaRegStar, FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const defaultClientImages = [
  "https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/55.jpg",
];

const ClientReview = () => {
  const t = useTranslations("homePage.reviewsSection");

  
  const reviews = t.raw("reviews"); 

  const combinedReviews = reviews.map((review, index) => ({
    ...review,
    image: defaultClientImages[index % defaultClientImages.length],
    rating: index % 2 === 0 ? 4 : 5,
  }));

  const allReviews = combinedReviews.length > 0
    ? combinedReviews
    : [{
        text: "No reviews available",
        author: "Admin",
        position: "System",
        image: "https://randomuser.me/api/portraits/lego/1.jpg",
        rating: 5,
      }];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
          {t("title")}
        </h1>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={700}
        loop={true}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="client-review-swiper"
      >
        {allReviews.map((review, idx) => (
          <SwiperSlide key={idx} className="md:pt-16">
            <div className="bg-primary p-6 rounded-lg relative border border-gray h-full flex flex-col justify-between min-h-[350px]">
              <FaQuoteLeft className="absolute top-4 left-4 text-[1.3rem] text-primary-active" />

              <div className="flex justify-center">
                <img
                  src={review.image}
                  alt={review.author}
                  className="w-[100px] h-[100px] object-cover rounded-full border-4 border-gray-800"
                  onError={(e) => {
                    e.currentTarget.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                  }}
                />
              </div>

              <p className="text-secondary text-[0.9rem] mt-6 text-center">
                {review.text}
              </p>

              <div className="flex items-start mt-5 justify-between">
                <div>
                  <h2 className="text-[1.2rem] font-[600] text-white">{review.author}</h2>
                  <p className="text-[1rem] text-secondary">{review.position}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < review.rating ? (
                      <FaStar key={index} className="text-[1.3rem] text-[#ffba24]" />
                    ) : (
                      <FaRegStar key={index} className="text-[1.3rem] text-[#ffba24]" />
                    )
                  )}
                </div>
              </div>

              <FaQuoteLeft className="absolute bottom-4 right-4 rotate-180 text-[1.3rem] text-primary-active" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
        .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
          background: #00b795;
          opacity: 1;
        }
        .client-review-swiper .swiper-pagination-bullet-active {
          background: #00b795;
        }
        .swiper-pagination {
          margin-top: 20px;
          position: relative !important;
        }
      `}</style>
    </div>
  );
};

export default ClientReview;

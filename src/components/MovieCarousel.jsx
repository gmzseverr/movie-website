import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

function MovieCarousel({ movies, onMovieChange, activeMovie }) {
  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <div className="relative z-10">
      <div className="sm:max-w-[500px] max-w-[400px] z-10">
        <Swiper
          modules={[Pagination, EffectCoverflow]}
          grabCursor={true}
          centeredSlides={true}
          speed={900}
          initialSlide={0}
          spaceBetween={20}
          loop={true}
          slidesPerView={3}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            const activeIndex = swiper.realIndex;
            onMovieChange(movies[activeIndex]);
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="flex justify-center items-center group"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className={`block w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-110
                  ${
                    activeMovie?.id === movie.id ? "opacity-100" : "opacity-50"
                  }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCarousel;

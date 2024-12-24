"use client";

import { imageApi, softApi } from "@/config/config";
import { useWeb } from "@/store/store";
import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import phone from "../../public/270252383_3110182259258977_8672287540388851708_n.png";
import toast, { Toaster } from "react-hot-toast";
import { VolumeUp } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Home() {
  let {
    productData,
    getProducts,
    getDataById,
    AddCard,
    getBrands,
    dataBrands,
  } = useWeb();

  useEffect(() => {
    getProducts();
    getBrands();
  }, [getProducts, getBrands]);
  let user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("username");
  }
  let router = useRouter();

  return (
    <div className="mx-auto max-w-[90%] container md:w-[100%] px-4 py-8">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="mb-8">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          // pagination={{ clickable: true }}
          // navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-[600px] md:h-[200px] rounded-xl overflow-hidden"
        >
          <SwiperSlide>
            <div className="relative w-full h-full bg-black">
              <Image
                src={phone}
                className="w-full h-[600px] md:h-[200px]"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full bg-black">
              <Image
                src={phone}
                className="w-full h-[600px] md:h-[200px]"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full bg-black">
              <Image
                src={phone}
                className="w-full h-[600px] md:h-[200px]"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full bg-black">
              <Image
                src={phone}
                className="w-full h-[600px] md:h-[200px]"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full bg-black">
              <Image
                src={phone}
                className="w-full h-[600px] md:h-[200px]"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <h1 className="text-2xl font-bold mb-8">Каталог товаров</h1>
      <div className="flex flex-wrap justify-around gap-6 md:gap-2">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg w-[300px] md:w-[150px] md:p-2 shadow-md p-4 relative group"
          >
            <div className="absolute top-4 right-4 z-10">
              <button className="text-gray-400 hover:text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src={`${imageApi}/${product.image}`}
                alt={product.productName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="space-y-2">
              <Link key={product.id} href={`/${product.id}`}>
                <h2 className="text-lg font-semibold line-clamp-2">
                  {product.productName}
                </h2>
                <p className="text-sm text-gray-600">{product.color}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">{product.price} с.</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice} с.
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  {Math.round(product.price / 24)} с. × 24 мес
                </div>
              </Link>

              <button
                onClick={() => {
                  user
                    ? toast.promise(AddCard(product.id), {
                        loading: "Добавление...",
                        success: <b>Добавлено в корзину!</b>,
                        error: <b>Не удалось добавить.</b>,
                      })
                    : router.push("/login");
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

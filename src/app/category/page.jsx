"use client";
import React, { useEffect, useState } from "react";
import { useWeb } from "@/store/store";
import { imageApi } from "@/config/config";
import Image from "next/image"; 
import { Input } from "@/components/ui/input";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const Category = () => {
  let { productData, getProducts, getBrands,dataBrands,getProd,products,getMinMax,minMax } = useWeb();
  let {categoryById,subcategoryById}=useParams()
  const [isModalOpen, setIsModalOpen] = useState(false); 

   let pathname=usePathname()

  useEffect(() => {
    getProducts();
    getProd()
    getBrands()
    getMinMax()
  }, []);
  const toggleModal = () => setIsModalOpen(!isModalOpen); 

  return (
    <div className="w-full">
      <div className=" mx-auto w-[95%] py-8">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-8">Каталог товаров </h1>
        <button className="hidden md:block text-xl mb-8 px-[20px] bg-[#FDB91D] rounded-lg py-[10px]" onClick={toggleModal}>filter</button>
        </div>
        <div className="flex gap-[20px] flex-wrap">
          <div className="md:hidden ">
          <div className="p-4 border rounded-md w-full max-w-xs bg-white shadow-md space-y-6">
   
      <div>
        <h2 className="font-bold mb-3 text-lg">Цена</h2>
        <div className="flex items-center space-x-2 mb-2">
          <Input
            type="number"
            placeholder="от 649"
            className="h-10 w-24 text-sm"
          />
          <span>—</span>
          <Input
            type="number"
            placeholder="до 24265"
            className="h-10 w-24 text-sm"
          />
        </div>
      </div>

      
      <div>
        <h2 className="font-bold mb-3 text-lg">Бренд</h2>
        <div className="space-y-2">
          {dataBrands.map((e) => (
            <label
            key={e.id}
              className="flex items-center space-x-2 text-gray-700"
            >
               <input
                   type='checkbox'
                   onChange={(ev) => {ev  .target.checked ? getProd("BrandId", e.id) : (pathname == `/category/${categoryById}` ? getProd("CategoryId", categoryById) : getProd("SubcategoryId", subcategoryById) )}}
                   />
              <span>{e.brandName}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
          </div>
        <div className="w-[79%] md:w-[100%] md:gap-2  flex flex-wrap justify-evenly gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 w-[300px] md:w-[170px] relative group"
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
                <Link href={`/${product.id}`}>
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
                </Link>

                <div className="text-sm text-gray-500">
                  {Math.round(product.price / 24)} с. × 24 мес
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Фильтры</h2>

                <button
                  onClick={toggleModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                  ×
                </button>

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Цена</h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="от 649"
                      className="h-10 w-24 text-sm"
                    />
                    <span>—</span>
                    <Input
                      type="number"
                      placeholder="до 24265"
                      className="h-10 w-24 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Бренд</h3>
                  <div className="space-y-2">
                    {dataBrands.map((e) => (
                      <label
                        key={e.id}
                        className="flex items-center space-x-2 text-gray-700"
                      >
                        <input
                          type="checkbox"
                          onChange={(ev) => {
                            ev.target.checked
                              ? getProd("BrandId", e.id)
                              : pathname == `/category/${categoryById}`
                              ? getProd("CategoryId", categoryById)
                              : getProd("SubcategoryId", subcategoryById);
                          }}
                        />
                        <span>{e.brandName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={toggleModal}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg mt-6"
                >
                  Применить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;

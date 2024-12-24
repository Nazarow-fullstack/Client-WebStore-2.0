"use client"
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { softApi } from '@/config/config';
import { useWeb } from '@/store/store';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
let fileAPI = softApi + "/images/";
let primary = "orange";
// import { Checkbox } from "@/components/ui/checkbox"; 
import { Input } from "@/components/ui/input";

const ById = () => {
    let {products, getProd, category, getCatId,getBrands,dataBrands} = useWeb();
      let {categoryById,subcategoryById}=useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const toggleModal = () => setIsModalOpen(!isModalOpen); 
       let pathname=usePathname()
    useEffect(() => {
        getBrands()
        getProd("CategoryId", categoryById);
        getCatId(categoryById);
    }, []);
    const bItems = [
        { label: 'Каталог товаров', href: '/' },
        { label: category.categoryName },
    ];
    return <div className='max-w-[90%] mx-auto flex gap-[20px]  mt-[50px] mb-[50px]'>
        <div className="p-4 border rounded-md w-full h-[500px] max-w-xs bg-white shadow-md space-y-6 md:hidden">
                   
                      <div className=''>
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
                   onChange={(ev) => {ev.target.checked ? (console.log(e), getProd("BrandId", e.id)) : (pathname == `/category/${categoryById}` ? getProd("CategoryId", categoryById) : getProd("SubcategoryId", subcategoryById) )}}
                   />
                              <span>{e.brandName}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                
                    </div>
        <div>
        <button  className="hidden md:block text-xl mb-8 px-[20px] bg-[#FDB91D] rounded-lg py-[10px]" onClick={toggleModal}>filter</button>

        <Breadcrumb items={bItems} />
        <div className="flex flex-wrap gap-3 w-[85%] mt-[30px]">
        {category.subCategories?.map((el,id) => {
            return (
            <Link key={id} href={`/category/${categoryById}/${el.id}`}>
                <div
                    key={el.id}
                    className="bg-gray-100 text-black px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                >
                    <h1 className="text-sm font-medium whitespace-nowrap">{el.subCategoryName}</h1>
                </div>
            </Link>
            );
        })}
        </div>
        <div className='max-w-[85%] mx-auto mt-[60px] flex justify-between flex-wrap items-center'>
            {products.map((el) => {
                return <div key={el.id} className="group flex flex-col mt-[15px] items-start p-4 rounded-lg shadow-md bg-white w-64">
                    <Image
                        width={400}
                        height={100}
                        src={fileAPI + el.image}
                        alt={el.productName} 
                        className="w-full h-48 object-cover mb-3"
                        />
                    <div className="flex items-center mb-2">
                        {el.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded mr-2">
                                -{el.discount}%
                            </span>
                        )}
                        <span className="font-bold text-lg text-gray-900 mr-2">
                            {el.price} c.
                        </span>
                        {el.oldPrice && (
                            <span className="line-through text-gray-500 text-sm">
                                {el.oldPrice} c.
                            </span>
                        )}
                    </div>
                    <Link href={`/${el.id}`}><h1 className={`font-medium mb-3 group-hover:text-[#b98fe6]`}>{el.productName}</h1></Link>
                    {!el.productInMyCart ? (
                        <button
                        style={{backgroundColor: primary,}}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = primary}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = primary}
                        className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                    >
                        <ShoppingCart className="w-[16px]" /> В корзину
                    </button>                        
                    ) : null}
                </div>
            })}
        </div>
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
}

export default ById

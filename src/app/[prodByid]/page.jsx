"use client";

import { imageApi } from '@/config/config';
import { useWeb } from '@/store/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ProdByid = () => {
  const { getDataById, productDataByid } = useWeb();
  const { prodByid } = useParams();

  useEffect(() => {
    getDataById(prodByid);
  }, [getDataById]);

  console.log(productDataByid);

  return (
    <div className='max-w-[1180px] mx-auto mt-[50px] h-[83vh] mb-[250px] p-[20px]'>
    <div className='w-[100%] flex items-center  flex-wrap justify-between h-[100%]'>
      <div className='w-[55%] md:w-[100%] flex items-center justify-center md:mt-[200px]'>
      <Image
              className="rounded-lg mt-[-150px]"
              width={500}
              height={0}
              src={`${imageApi}/${productDataByid.images?.[0].images}`}
              alt={productDataByid?.productName || 'Product Image'}
            />
      </div>
      <div className='w-[45%] md:50% h-full'>
          <h1 className='mt-[50px] text-[30px] font-medium'>{productDataByid.productName}</h1>
          <p className='mt-[10px] text-[gray] text-[14px] font-medium'>Код товара: {productDataByid.code}</p>
          <h2 className='mt-[20px] text-[35px] font-bold'>{productDataByid.price} c.</h2>
          <p>В рассрочку c. / мес.</p>
          <hr className='my-[15px]' />
          <p className='font text-[17px] mt-[20px] mb-[10px]'>
            <span className='text-[gray]'>Бренд </span> 
            {productDataByid.brand}
          </p>
          <p className='font text-[17px] mb-[10px]'>
            <span className='text-[gray]'>Описание: </span>
            {productDataByid.description}
          </p>
          <div className='font text-[17px] mb-[10px] flex items-center gap-[10px]'>
            <span className='text-[gray]'>Цвета: </span>
            <div className={`w-[30px] h-[30px] rounded-[50%]`}
                style={{
                  background: productDataByid.color?.toLowerCase()
                }}
            />
          </div>
      </div>
    </div>
  </div>
  );
};

export default ProdByid;

"use client"
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Favorite = () => {
    const router=useRouter
  return (
    <div>
       <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">🐱</div>
            <h3 className="text-2xl font-medium mb-2">Тут появятся ваши купленные товары</h3>
            <p className="text-gray-600 mb-6">
            Посмотрите каталог чтобы найти товары, или воспользуйтесь поиском 😊
            </p>
            <Link href={"/category"}>
            <button
              
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
            >
              Перейти в каталог
            </button></Link>
          </div>
        </div>
    </div>
  )
}

export default Favorite

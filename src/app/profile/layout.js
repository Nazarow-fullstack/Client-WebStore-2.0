"use client"
import Link from 'next/link'
import { useRouter } from 'next/router'
import {React,  useState } from 'react'

const layout = ({children}) => {
      // const [activeTab, setActiveTab] =useState('all')
    //   const router = useRouter()

    const handleLogout = () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
    
      }
      };
  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap gap-8">
    
    <div className="w-80 bg-white rounded-lg p-6 flex flex-col gap-8 h-fit">
  
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 overflow-hidden">
          
        </div>
        <h2 className="text-lg font-medium mb-1">Неидентифицированный пользователь</h2>
        <p className="text-red-500 text-sm">Неидентифицированный</p>
      </div>


      <nav className="flex flex-col gap-4">
        <Link  href={"/profile"}>
        <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-xl">📦</span>
          <p>Заказы</p>
        </button>
        </Link>
        <Link href={"/profile/favorite"}><button className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-xl">❤️</span>
          <p>Избранное</p>
        </button></Link>
      </nav>

    
      <Link href={"/login"}>
      <button 
       onClick={()=>{
        handleLogout()
       }}
        className="flex items-center gap-2 p-3 text-red-500 hover:bg-gray-50 transition-colors mt-auto"
      >
        <span className="text-xl">↪️</span>
        <span>Выйти</span>
      </button></Link>
    </div>


    <div className="flex-1">
   
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-4">
          <button
            className={`px-6 py-3 relative` }
            // ${
            //   activeTab === 'all'
            //     ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow-400'
            //     : 'text-gray-500'
            // }`}
            onClick={() => setActiveTab('all')}
          >
            Все заявки
          </button>
          <button
            className={`px-6 py-3 relative`}
            //    ${
            //   activeTab === 'successful'
            //     ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow-400'
            //     : 'text-gray-500'
            // }`}
            onClick={() => setActiveTab('successful')}
          >
            Успешные
          </button>
        </div>
      </div>


      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center max-w-md">
      {children}
          
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default layout

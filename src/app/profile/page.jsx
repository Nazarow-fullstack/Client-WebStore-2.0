'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('all')
  const router = useRouter()

  return (
    <div className="w-full">
      <div className="container mx-auto w-[95%]">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">🐱</div>
            <h3 className="text-2xl font-medium mb-2">Место для ваших заявок</h3>
            <p className="text-gray-600 mb-6">
              Посмотрите каталог или воспользуйтесь поиском. Вдруг что приглянется 😊
            </p>
            <button
              onClick={() => router.push('/category')}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

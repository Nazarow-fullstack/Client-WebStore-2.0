import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1F1F1F] text-white py-12 w-[100%]">
      <div className="container mx-auto  px-4">
        <div className="flex justify-evenly flex-wrap gap-8">
        
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <Image src="/logo.png" alt="WebStore Logo" width={120} height={40} />
            </Link>
            <div className="space-y-2">
              <Link href="/about" className="block hover:text-orange-300">О нас</Link>
              <Link href="/vacancies" className="block hover:text-orange-300">Вакансии</Link>
              <Link href="/news" className="block hover:text-orange-300">Новости WebStore</Link>
            </div>
          </div>

      
          <div className="space-y-4">
            <h3 className="text-orange-400 font-medium">Для покупателей</h3>
            <div className="space-y-2">
              <Link href="/installment" className="block hover:text-orange-300">Рассрочка</Link>
              <Link href="/requisites" className="block hover:text-orange-300">Реквизиты</Link>
              <Link href="/support" className="block hover:text-orange-300">Чат поддержки</Link>
            </div>
          </div>


          <div className="space-y-4">
            <h3 className="text-orange-400 font-medium">Для партнёров</h3>
            <div className="space-y-2">
              <Link href="/sell" className="block hover:text-orange-300">Продавать на WebStore</Link>
              <Link href="/dashboard" className="block hover:text-orange-300">Личный кабинет продавца</Link>
            </div>
          </div>


          <div className="space-y-4">
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="https://t.me/catinglas" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Image src="/telegram.svg" alt="Telegram" width={24} height={24} />
              </Link>
            </div>

          </div>
        </div>


        <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <p> {currentYear} WebStore. г. Душанбе, 101 мкр-н, ул. Багаутдинова, 9</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

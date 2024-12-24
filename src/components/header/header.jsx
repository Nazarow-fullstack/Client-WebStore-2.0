'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import Person2Icon from '@mui/icons-material/Person2';
import { Menubar } from '@radix-ui/react-menubar';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../ui/menubar';
import { useWeb } from '@/store/store';
import { ChartBarStacked, House, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [username, setUsername] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const router = useRouter();
let token=null
let storedUsername=null
  const { data, getData } = useWeb();

  useEffect(() => {
    getData();
  }, [getData]); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('access_token');
      storedUsername = localStorage.getItem('username');
    }
    if (token && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
    }
    setUsername('');
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md w-full ">
      <div className="w-full">
        <nav className=" mx-auto w-[90%] py-3 flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} width={150} height={40} alt="Alif Shop" className="object-contain" />
          </Link>

          <div className="bg-[#FDB91D] text-black px-4 py-2 rounded flex items-center gap-2">
            <span className="material-icons">menu</span>
            <div>
            <Menubar className="">
              <MenubarMenu>
                <MenubarTrigger>Каталог</MenubarTrigger>
                <MenubarContent>
                  {data.map((el) => (
                    <MenubarSub
                      key={el.id}
                      onMouseEnter={() => setActiveCategory(el.id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <div onClick={() => {
                        router.push(`/category/${el.id}`);
                      }}>
                        <MenubarSubTrigger>{el.categoryName}</MenubarSubTrigger>
                      </div>
                      <MenubarSubContent>
                        {el.subCategories?.length > 0 ? (
                          el.subCategories.map((elem) => (
                            <div key={elem.id} onClick={() => {
                                router.push(`/category/${el.id}/${elem.id}`);
                            }}>
                              <MenubarItem key={elem.id}>{elem.subCategoryName}</MenubarItem>
                            </div>
                          ))
                        ) : (
                          <MenubarItem className="text-[red]">
                            No products available
                          </MenubarItem>
                        )}
                      </MenubarSubContent>
                    </MenubarSub>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            </div>
          </div>

          <div className="flex-grow">
            <div className="relative">
              <input 
                type="text" 
                placeholder="название товара или артикул" 
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <SearchIcon className="text-[#FDB91D]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 md:hidden ">

            <div className="text-center items-center gap-2 text-gray-600">
              <div className='ml-[15px]'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              </div>
              <span>Душанбе</span>
            </div>


            <div>
              <Link
                href={username ? "/profile" : "/login"}
                className=" items-center gap-2 text-gray-600"
              >
                <div className='ml-[5px]'>
                <Person2Icon />
                </div>
                {username ? (
                  <span className="text-blue-600">{username}</span>
                ) : (
                  <span>Profile</span>
                )}
              </Link>
            </div>


            <Link
              href="/cart"
              className=" items-center gap-2 text-gray-600"
            >
              <div className='ml-[15px]'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              </div>
              <span>Корзина</span>
            </Link>
          </div>


          </nav>
        </div>


        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-10 hidden md:block">
        <nav className="flex justify-around py-3">
          <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <House/>
            <span className="text-sm">Home</span>
          </Link>
          <Link href="/category" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <ChartBarStacked />
            <span className="text-sm">Category</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <ShoppingCart/>
          <span className="text-sm">Cart</span>
              </Link>
          <Link
                href={username ? "/profile" : "/login"}
                className=" items-center gap-2 text-gray-600"
              >
                <div className='ml-[7px]'>
                <Person2Icon />
                </div>
                {username ? (
                  <span className="text-blue-600">{username}</span>
                ) : (
                  <span>Profile</span>
                )}
              </Link>
        </nav>
      </footer>
      </header>
  );
};

export default Header;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from 'next/navigation';

function Header() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Work List",
      path: "/work-list",
    },
  ];

  // Determine user role from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const dashboardPath = storedUser?.role === "employer" 
    ? "/employer/dashboard"
    : storedUser?.role === "employee"
    ? "/employee/dashboard"
    : "/"; // Default path if role is not found

  // Get the current pathname
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full p-4 md:px-20 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
      </div>
      <div>
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <li
                className={`cursor-pointer hover:scale-105 transition-all ease-in-out ${
                  pathname === item.path ? 'text-primary font-semibold' : 'hover:text-primary'
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
          <Link href={dashboardPath}>
            <li
              className={`cursor-pointer hover:scale-105 transition-all ease-in-out ${
                pathname === dashboardPath ? 'text-primary font-semibold' : 'hover:text-primary'
              }`}
            >
              Dashboard
            </li>
          </Link>
          {storedUser?.role === "employer" && <Link href={`/employer/work-distribution`}>
            <li
              className={`cursor-pointer hover:scale-105 transition-all ease-in-out ${
                pathname === `/employer/work-distribution` ? 'text-primary font-semibold' : 'hover:text-primary'
              }`}
            >
              Work Distribution
            </li>
          </Link>}
        </ul>
      </div>
      <div className="text-2xl font-semibold lg:hidden md:hidden flex">
        <Popover>
          <PopoverTrigger>
            <FiMenu />
          </PopoverTrigger>
          <PopoverContent className="flex-col gap-4 flex border-b-2">
            {Menu.map((item, index) => (
              <Link href={item.path} key={index}>
                <h3
                  className={`pl-2 cursor-pointer hover:scale-105 transition-all ease-in-out ${
                    pathname === item.path ? 'text-blue-500 font-semibold' : 'hover:text-blue-500'
                  }`}
                >
                  {item.name}
                </h3>
              </Link>
            ))}
            <Link href={dashboardPath}>
              <h3
                className={`pl-2 cursor-pointer hover:scale-105 transition-all ease-in-out ${
                  pathname === dashboardPath ? 'text-blue-500 font-semibold' : 'hover:text-blue-500'
                }`}
              >
                Dashboard
              </h3>
            </Link>
            {storedUser?.role === "employer" && <Link href={`/employer/work-distribution`}>
              <h3
                className={`pl-2 cursor-pointer hover:scale-105 transition-all ease-in-out ${
                  pathname === '/employer/work-distribution' ? 'text-blue-500 font-semibold' : 'hover:text-blue-500'
                }`}
              >
                Work Distribution
              </h3>
            </Link>}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Header;

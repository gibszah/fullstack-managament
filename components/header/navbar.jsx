"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import ImageProfile from "../UI/imageProfil";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();

  const isAuth = status === "authenticated";
  console.log("otentikasi", isAuth);

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    // if (!data.error) {
    //   // Navigasi ke halaman '/' setelah berhasil logout
    //   router.push("/auth");
    // }
  };

  return (
    <>
      <nav className="bg-green-200 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl py-2 mx-auto">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              className="w-10 h-10 mr-2 rounded-full"
              src="/small.svg"
              alt="logo"
              width={300}
              height={900}
              priority
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Apt. Kairo
            </span>
          </Link>
          <div className="flex items-center w-auto space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              onClick={handleChange}
            >
              {isAuth ? (
                <ImageProfile />
              ) : (
                <Image
                  src="https://i.pinimg.com/736x/f1/8b/97/f18b97cb56595a0e8761282ca5ef5c07.jpg"
                  className="w-12 rounded-full h-18"
                  alt="user photo"
                  width={32}
                  height={32}
                />
              )}
            </button>

            {open && (
              <div className="gap-1 mx-2">
                <span className="bg-indigo-100 text-gray-900 text-sm font-medium italic me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                  {data?.user?.name}
                </span>
                {isAuth ? (
                  <button onClick={handleSignOut}>
                    <span className="bg-white cursor-pointer text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                      Logout
                    </span>
                  </button>
                ) : (
                  <button onClick={() => router.push("/auth")}>
                    <span className="bg-white cursor-pointer text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                      Login
                    </span>
                  </button>
                )}
              </div>
            )}
            <button
              onClick={handleToggle}
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                    stroke="currentColor"
                  />
                )}
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium border border-gray-100 rounded-lg bg-neutral md:p-0 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <button
                  className={` ${
                    pathname === "/"
                      ? "text-white bg-indigo-500 hover:bg-indigo-500  ring-4 ring-graybg-indigo-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:ring-graybg-indigo-500"
                      : "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  } `}
                  onClick={() => router.push("/")}
                >
                  {" "}
                  Home
                </button>
              </li>
              <li>
                <button
                  className={` ${
                    pathname === "/cashier"
                      ? "text-white bg-indigo-500 hover:bg-indigo-500  ring-4 ring-graybg-indigo-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:ring-graybg-indigo-500"
                      : "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  } `}
                  onClick={() => router.push("/cashier")}
                >
                  {" "}
                  Cashier
                </button>
              </li>

              <li>
                <button
                  className={` ${
                    pathname === "/history"
                      ? "text-white bg-indigo-500 hover:bg-indigo-500  ring-4 ring-graybg-indigo-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:ring-graybg-indigo-500"
                      : "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  } `}
                  onClick={() => router.push("/history")}
                >
                  {" "}
                  History
                </button>
              </li>

              <li>
                <button
                  className={` ${
                    pathname === "/produk"
                      ? "text-white bg-indigo-500 hover:bg-indigo-500  ring-4 ring-graybg-indigo-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:ring-graybg-indigo-500"
                      : "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  } `}
                  onClick={() => router.push("/produk")}
                >
                  {" "}
                  Produk
                </button>
              </li>
              {isAuth && (
                <li className="lg:hidden">
                  <button onClick={handleSignOut}>
                    <span className="bg-neutral-200 italic cursor-pointer text-blue-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                      &#10503; Logout
                    </span>
                  </button>
                </li>
              )}

              {!isAuth && (
                <li className="lg:hidden">
                  <button onClick={() => router.push("/auth")}>
                    <span className="bg-neutral-200 italic cursor-pointer text-blue-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                      &#10503; Login
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

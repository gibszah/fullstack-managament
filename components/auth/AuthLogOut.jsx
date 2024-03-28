"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const AuthLogOut = () => {
  const router = useRouter();

  const { data, status } = useSession();

  const isAuth = status === "authenticated";
  //   const [logoutInitiated, setLogoutInitiated] = useState(false);

  const performLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const [showToast, setShowToast] = useState(false);

  const handleLogout = async () => {
    await signOut(); // Lakukan logout

    // Tampilkan notifikasi
    setShowToast(true);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  useEffect(() => {
    let logoutTimeout;
    if (isAuth) {
      // window.location.reload();
      logoutTimeout = setTimeout(performLogout, 40600000); // 10000 milidetik (10 detik)
    }

    return () => clearTimeout(logoutTimeout); // Membersihkan timeout
  }, [isAuth]);

  if (isAuth)
    return (
      <div className="bg-white rounded dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src="/small.svg" alt="Profl" width={50} height={50} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu text-black menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 overflow-y-auto"
        >
          <li>
            <Link href="/stokkosong" as="/stokkosong">
              Stok Kurang dari 3
            </Link>
          </li>
          <li>
            <Link href="/pengeluaran" as="/pengeluaran">
              Pengeluaran
            </Link>
          </li>
          <li></li>
          <li>
            {/* {data?.user?.name === "obi" && (
              <Link href="/dashboard">Dashboard</Link>
            )} */}
            {data?.user?.name === "nurpita" && (
              <Link href="/dashboard">Dashboard</Link>
            )}
          </li>
          <li>
            {/* {data?.user?.name === "obi" && (
              <Link href="/dashboard">Dashboard</Link>
            )} */}
            {data?.user?.name === "nurpita" && (
              <Link href="/revenue">Revenue</Link>
            )}
          </li>
          <li>
            <p>
              {" "}
              <button onClick={handleLogout}>logout</button>
            </p>
          </li>
        </ul>
      </div>
    );

  return (
    <div>
      {showToast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Anda Berhasil logout</span>
          </div>
        </div>
      )}
      <button type="button" onClick={() => router.push("/auth")}>
        Login
      </button>
    </div>
  );
};

export default AuthLogOut;

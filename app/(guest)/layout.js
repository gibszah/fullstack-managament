"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const PrivateLayout = ({ children }) => {
  const { status } = useSession();
  const isAuth = status === "authenticated";

  if (isAuth) {
    redirect("/cashier");
  }

  return <>{children}</>;
};

export default PrivateLayout;

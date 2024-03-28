"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const PrivateLayout = ({ children }) => {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";

  if (!isAuth) {
    redirect("/auth");
  }

  return <>{children}</>;
};

export default PrivateLayout;

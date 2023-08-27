"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useRecoilValue, useRecoilState } from "recoil";
import { userFullName } from "@/store/selectors/userFullName";
import { isSeller } from "@/store/selectors/isSeller";
import { userAtom } from "@/store/atom/userAtom";
import DropDownMenu from "@/ui/dropdown";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";

const Navbar = () => {
  const user = useRecoilValue(userFullName);
  const seller = useRecoilValue(isSeller);
  console.log(user);
  console.log(seller);
  const [_, setUser] = useRecoilState(userAtom);
  const router = useRouter();
  const logOut = async () => {
    try {
      const response = await axios.get("api/users/signout");
      toast.success(response.data.msg, {
        duration: 3000,
        position: "top-center",
      });
      setUser({
        fullName: null,
        email: null,
        isSeller: false,
        id: null,
      });

      router.push("/signin");
    } catch (error: any) {
      console.log(error.message);
      console.log(error.message);
    }
  };

  return (
    <div style={{ marginTop: 0 }}>
      {user && (
        <header>
          <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  <Link href="/products">Welcome Back, {user}</Link>
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  Let's shop baby 🎉
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                {seller ? (
                  <DropDownMenu />
                ) : (
                  <ShoppingCartOutlined
                    style={{ fontSize: 25, cursor: "pointer" }}
                  />
                )}

                <button
                  className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      <Toaster />
    </div>
  );
};

export default Navbar;

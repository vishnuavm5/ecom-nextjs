"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { INITIAL_STATE, loginReducer } from "@/Reducers/LoginReducer";
import { useReducer } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atom/userAtom";

const Signin = () => {
  const router = useRouter();
  const [_, setUser] = useRecoilState(userAtom);

  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/users/signin", state);
      if (response.data.success) {
        router.push("/products");
        toast.success("Logged in successfully", {
          duration: 3000,
          position: "top-center",
        });
        setUser({
          fullName: response.data.fullName,
          email: response.data.email,
          isSeller: response.data.isSeller,
          id: response.data.id,
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        duration: 3000,
        position: "top-center",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Welcome Again!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            The best Shopping site you will ever see...
          </p>

          <form
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={onSubmit}
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) =>
                    dispatch({ type: "setEmail", payload: e.target.value })
                  }
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  name="password"
                  onChange={(e) =>
                    dispatch({ type: "setPassword", payload: e.target.value })
                  }
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signin;

"use client";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../../../../components/UI/Alert";

const SignUpPage = () => {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [explain, setExplain] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    setBusy(true);
    e.preventDefault();

    const initialUser = {
      name: name,
      email: email,
      password: password,
      role: "user",
    };
    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        body: JSON.stringify(initialUser),
      });

      // Menangani respons dari server
      if (res.ok) {
        const data = await res.json();
        setBusy(false);
        console.log(data);
        router.replace("/auth");
      }
      if (!res.ok) {
        setError(true);
        throw new Error("Error sending request");
      }
    } catch (error) {
      setExplain(error.message);
      console.error("Error:", error);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  return (
    <>
      <div className="h-screen ">
        {error ? (
          <div>
            <Alert value={explain} />
          </div>
        ) : null}

        <form className="max-w-md mx-auto mt-20" onSubmit={handleSubmit}>
          <div className="items-center mb-3 text-center">
            <span>
              <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="mb-3 text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-sky-400">
                  REGISTER &nbsp;
                </span>{" "}
                {/* Apt. Kairo */}
              </h1>
            </span>
          </div>
          <div className="relative z-0 w-full mt-10 mb-5 group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nama
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            {/* <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (123-456-7890)
              </label>
            </div> */}
          </div>
          <button
            type="submit"
            disabled={busy}
            style={{ opacity: busy ? 0.5 : 1 }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <div className="mt-12">
            Do you have account? please &nbsp;
            <button
              style={{ color: "blue" }}
              type="button"
              onClick={() => router.push("/auth")}
            >
              click
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;

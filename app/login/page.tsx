"use client";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../context/user";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const router = useRouter();

  const { user, login } = useUser();

  const emailRef: RefObject<HTMLInputElement> = useRef(null);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdValid, setPwdValid] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setPwdValid(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setEmailValid(result);
  }, [email]);

  async function handleButtonClick(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const response = login(email, pwd);
    console.log(response);
  }
  if (user.token) {
    router.replace("/");
  }
  return (
    <div className=" h-screen">
      <div className="bg-gray-100 flex  justify-center items-center h-full">
        <form
          onSubmit={handleButtonClick}
          className="border flex flex-col py-10 px-8 space-y-10 bg-white w-[350px] rounded-lg shadow-lg"
        >
          <h1 className="text-center font-bold text-4xl">Login</h1>
          <div className="flex flex-col space-y-10">
            <input
              ref={emailRef}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="text-gray-800 focus:outline-none py-3 flex-grow border-b-2"
              type="email"
              name=""
              id=""
              placeholder="Email"
              required
            />

            <input
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              className="focus:outline-none py-3  "
              type="password"
              placeholder="password"
              required
            />
          </div>
          <Button color="primary" size="lg" type="submit">
            Login
          </Button>
          <div className="text-center  text-text">
            <h4>Don&apos;t have an account?</h4>
            <Link
              href="register"
              className="cursor-pointer hover:text-blue-300 transition-all duration-300 text-primary text-[20px]"
            >
              &nbsp;Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

"use client";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import axios from "axios";
import { json } from "stream/consumers";
import { FaCheck } from "react-icons/fa";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const REGISTER_URL = "/register";
const sendData = async (name: string, email: string, password: string) => {
  const response = await axios.post(
    "/api/auth/register",
    {
      name,
      email,
      password,
    },

    {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    }
  );

  const data = response.data;
  console.log(data);
};

function Regiseter() {
  const userRef: RefObject<HTMLInputElement> = useRef(null);
  const errRef: RefObject<HTMLParagraphElement> = useRef(null);

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    console.log(result);
    console.log(name);
    setNameValid(result);
  }, [name]);

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

  useEffect(() => {
    setErrMsg("");
  }, [pwd, name, email]);

  function handleButtonClick(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    sendData(name, email, pwd);
  }

  return (
    <div className=" min-h-screen bg-gray-100 py-10">
      <div className="flex  justify-center items-center ">
        <form
          onSubmit={handleButtonClick}
          className="border flex flex-col py-10 px-8 space-y-10 bg-white w-[350px] rounded-lg shadow-lg"
        >
          <h1 className="text-center font-bold text-4xl">Regiseter</h1>
          <p
            ref={errRef}
            aria-live="assertive"
            className={`${errMsg ? "" : "absolute"}`}
          >
            {errMsg}
          </p>
          <div className="flex flex-col space-y-10 ">
            <div className="flex justify-between border-b-2 items-center">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                onFocus={() => {
                  setNameFocus(true);
                }}
                onBlur={() => {
                  setNameFocus(false);
                }}
                ref={userRef}
                className="focus:outline-none  py-3"
                type="name"
                placeholder="name "
              />
              <FaCheck
                className={`inline ${
                  nameValid ? "text-green-500" : "text-red-500"
                } ${name || "absolute right-[20000px]"} `}
              />
            </div>
            <p
              className={`${
                (nameFocus && name && !nameValid) || "absolute right-[20000px]"
              }`}
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <div className="flex justify-between items-center border-b-2">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="text-gray-800 focus:outline-none py-3 flex-grow"
                type="email"
                onFocus={() => {
                  setEmailFocus(true);
                }}
                onBlur={() => {
                  setEmailFocus(false);
                }}
                name=""
                id=""
                placeholder="Email"
                required
              />
              <FaCheck
                className={`inline ${
                  emailValid ? "text-green-500" : "text-red-500"
                } ${email || "absolute right-[20000px]"} `}
              />
            </div>
            <div className="flex justify-between items-center border-b-2">
              <input
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                className="focus:outline-none py-3  "
                type="password"
                placeholder="password"
                required
                onFocus={() => {
                  setPwdFocus(true);
                }}
                onBlur={() => {
                  setPwdFocus(false);
                }}
              />
              <FaCheck
                className={`inline ${
                  pwdValid ? "text-green-500" : "text-red-500"
                } ${pwd || "absolute right-[20000px]"} `}
              />
            </div>
            <p
              className={`${
                (pwdFocus && pwd && !pwdValid) || "absolute right-[20000px]"
              }`}
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: !@#$%
            </p>
          </div>
          <Button
            color="primary"
            size="lg"
            type="submit"
            disabled={!emailValid || !nameValid || !pwdValid ? true : false}
          >
            Login
          </Button>
          <div className="text-center  text-text">
            <h4>alredy have an account?</h4>
            <Link
              href="/login"
              className="cursor-pointer hover:text-blue-300 transition-all duration-300 text-primary text-[20px]"
            >
              &nbsp;Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Regiseter;

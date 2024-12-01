"use client"
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "../../lib/action";
import Header from "../../components/self/header";

function SignUp(props:any) {

 const [state,signUpAction]=useActionState(signUp,undefined);

  return (
    <div>
      <Header></Header>
    <div className="flex justify-center items-center mt-20 mr-40">
      <div>
        <div className="flex justify-center items-end">
          <h1 className="ml-32 text-4xl font-bold italic font-sans">
            Welcome
          </h1>
        </div>
        <div className="flex justify-center items-end ">
          <h1 className="ml-32 text-3xl italic font-sans">
            We Are{" "}
            <span className="text-3xl italic font-sans text-yellow-300">
              Happy
            </span>{" "}
            To See You
          </h1>
        </div>
        <div className="flex justify-center items-end ">
          <h1 className="ml-24 text-1xl italic font-sans">
            <span className="text-1xl italic font-sans">
              -------
            </span>{" "}
            Create Your Own Email
            <span className="text-1xl italic font-sans">
              -------
            </span>{" "}
          </h1>
        </div>
        <form action={signUpAction}>
          <div>
            <label
              htmlFor="username"
              className="ml-8 block text-sm font-medium"
            >
              UserName
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="ml-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="RoundPanda_12"
            />
            <br />
            {state?.errors?.username&&(
            <p className="text-red-500">{state.errors.username}</p>
          )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="ml-8 block text-sm font-medium"
            >
              E-Mail Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="ml-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John@123.com"
            />
            <br />
            {state?.errors?.email&&(
            <p className="text-red-500">{state.errors.email}</p>
          )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="ml-8 block  text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="ml-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe1232"
            />
            <SubmitButton></SubmitButton>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
export default SignUp;
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit"
    className="ml-20 bg-green-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-blue-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-10">
      SignUp
    </button>
  );
}
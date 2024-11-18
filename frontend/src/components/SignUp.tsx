import { Link, useNavigate } from "react-router-dom";
import { useState } from "preact/hooks";
import axios from "axios";
import { BACKEND_URL } from "../config"; // Replace with your actual backend URL


export const SignUp = () => {
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Update state based on user input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setPostInputs({ ...postInputs, [name]: value });
  };

  // Send data to backend
  const sendRequest = async () => {
    try {
      const { name, email, password } = postInputs;
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name,
        email,
        password,
      });
      const jwt = response.data;
      localStorage.setItem("token",jwt);
      navigate("/blogs")
      console.log("Response:", response.data); // Handle success
    } catch (error) {
      console.error("Error:", error); // Handle error
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-4xl font-extrabold">Create an account</div>
          <div className="pt-2 pl-2 text-xl font-medium text-slate-400">
            Already have an account?
            <Link
              className="pl-2 text-xl font-medium text-slate-400 underline"
              to={"/Signin"}
            >
              Login
            </Link>
          </div>

          <InputBar
            name={postInputs.name}
            email={postInputs.email}
            password={postInputs.password}
            onChange={handleChange}
            onSubmit={sendRequest}
          />
        </div>
      </div>
    </div>
  );
};

// InputBar Component
function InputBar({ name, email, password, onChange, onSubmit }: InputBarProps) {
  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh
          onSubmit();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="name"
            type="text"
            placeholder="Kiran"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="xxx@gmail.com"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">&copy; All rights reserved.</p>
    </div>
  );
}

interface InputBarProps {
  name: string;
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

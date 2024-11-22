import { Appbar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import {  SetStateAction, useState } from "react";
import { TitleEditor ,TextEditor } from "../components/inputBox";

export const Publish = () => {
  const [title, setTitle] = useState(""); // Title initialized as a string
  const [description, setDescription] = useState(""); // Description is a string
  const navigate = useNavigate();

  // Function to handle title change


  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          {/* Title Input */}
          <TitleEditor onChange={ (e: { target: { value: SetStateAction<string>; }; })  =>{
            setTitle(e.target.value);
        }} placeholder="title"  />

          {/* Description TextEditor */}
          <TextEditor  onChange={ (e: { target: { value: SetStateAction<string>; }; })  =>{
            setDescription(e.target.value);
        }} />

          {/* Publish Button */}
          <button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token") || "",
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              } catch (error) {
                console.error("Error publishing post:", error);
              }
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};


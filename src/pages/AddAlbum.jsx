import React, { useState } from "react";
import DashBoard from "../layout/DashBoard";
import { Image } from "lucide-react";
import toast from "react-hot-toast";
import { albumsAPI } from "../services/apiService";

function AddAlbum() {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const request = {
      name,
      description,
      bgColour: color,
    };
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("request", JSON.stringify(request));
      const response = await albumsAPI.add(formData);
      if (response.status === 201) {
        toast.success("Album Added Successfully");
        setName("");
        setDescription("");
        setColor("");
        setImage(null);
      } else {
        console.error(response);
        toast.error("Something went wrong , while adding album");
      }
    } catch (error) {
      console.error(error);
      toast.error("unexpected error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashBoard activeMenu="Add Album">
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-61px)]">
          <div className="w-16 h-16 place-self-center border-4  border-gray-400 border-t-green-800 rounded-full animate-spin "></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer  hover:border-green-500 transition-colors overflow-hidden"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image className="w-8 h-8 text-gray-500" />
              )}
            </label>
          </div>
          {/* albUm name */}
          <div className="flex flex-col gap-2.5">
            <p>Album name</p>
            <input
              type="text"
              className="w-[max(40vw-250px)] p-2.5 border-2 border-gray-400   bg-transparent  outline-green-600"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* album description */}
          <div className="flex flex-col gap-2.5">
            <p>Album description</p>
            <input
              type="text"
              className="w-[max(40vw-250px)] p-2.5 border-2 border-gray-400   bg-transparent  outline-green-600"
              placeholder="Type here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* album background color */}
          <div className="flex flex-col gap-3">
            <p>Background colour</p>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          {/* submit btn */}
          <button
            type="submit"
            className="text-base bg-[#3be477] text-white   py-2.5 px-14 cursor-pointer"
          >
            ADD
          </button>
        </form>
      )}
    </DashBoard>
  );
}

export default AddAlbum;

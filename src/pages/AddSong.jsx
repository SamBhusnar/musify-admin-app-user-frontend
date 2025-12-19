import React, { useEffect, useState } from "react";
import DashBoard from "../layout/DashBoard";
import { Check, Music, Image, Album } from "lucide-react";
import { albumsAPI, songsAPI } from "../services/apiService";
import toast from "react-hot-toast";

function AddSong() {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState("none");
  const [albumData, setAlbumData] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const request = {
      name,
      description,
      album,
    };
    const formData = new FormData();
    formData.append("audio", song);
    formData.append("image", image);
    formData.append("request", JSON.stringify(request));
    try {
      const response = await songsAPI.add(formData);
      if (response.status === 201) {
        setName("");
        setDescription("");
        setImage(null);
        setSong(null);
        setAlbum("none");
        toast.success("Song Added Successfully");
      } else {
        console.error(response?.data?.message);
        console.error(response);
        toast.error("Something went wrong , while adding song , try again");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Something went wrong , while adding song , try again"
      );
      toast.error("unexpected error occured : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const data = await albumsAPI.list();
      console.log("data : ", data);
      setAlbumData(data.data.albums);
    } catch (error) {
      console.log(error);

      toast.error(error?.message || "something went wrong ");
    }
  };
  useEffect(() => {
    loadAlbumData();
  }, []);

  return (
    <DashBoard activeMenu="Add Song">
      {loading ? (
        <>
          <div className="flex items-center justify-center h-[calc(100vh-61px)]">
            <div className="w-16 h-16 place-self-center border-4  border-gray-400 border-t-green-800 rounded-full animate-spin "></div>
          </div>
        </>
      ) : (
        <>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-start gap-8 text-gray-600 mt-5"
          >
            <div className="flex gap-8">
              {/*Upload song  */}
              <div className="flex flex-col gap-4">
                <p>Upload Song</p>
                <input
                  onChange={(e) => setSong(e.target.files[0])}
                  type="file"
                  id="song"
                  accept="audio/*"
                  hidden
                />
                <label
                  htmlFor="song"
                  className="flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer  hover:border-green-500 transition-colors overflow-hidden"
                >
                  {song ? (
                    <Check className="w-8 h-8 text-green-500" />
                  ) : (
                    <Music className="w-8 h-8 text-gray-500" />
                  )}
                </label>
              </div>
              {/* Upload image */}
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
            </div>

            {/* Song name */}
            <div className="flex flex-col gap-2.5">
              <p>Song name</p>
              <input
                type="text"
                className="w-[max(40vw-250px)] p-2.5 border-2 border-gray-400   bg-transparent  outline-green-600"
                placeholder="Type here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* song description */}
            <div className="flex flex-col gap-2.5">
              <p>Song description</p>
              <input
                type="text"
                className="w-[max(40vw-250px)] p-2.5 border-2 border-gray-400   bg-transparent  outline-green-600"
                placeholder="Type here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* albums */}
            <div className="flex flex-col gap-2.5">
              <p className="">Albums</p>
              <select
                defaultValue={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
              >
                {/* first option use only one time   */}
                <option value="none">none</option>
                {albumData.map((item, index) => (
                  <option key={index} value={item.name}>
                    {" "}
                    {item.name}{" "}
                  </option>
                ))}
              </select>
            </div>

            {/* submit btn */}
            <button
              type="submit"
              className="text-base bg-[#3be477] text-white   py-2.5 px-14 cursor-pointer"
            >
              ADD
            </button>
          </form>
        </>
      )}
    </DashBoard>
  );
}

export default AddSong;

import React, { useEffect, useState } from "react";
import DashBoard from "../layout/DashBoard";
import { albumsAPI } from "../services/apiService";
import toast from "react-hot-toast";
import { FileText, Image, Palette, Trash2 } from "lucide-react";

function ListAlbum() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumsAPI.list();
      console.log(response);
      setData(response.data.albums);
    } catch (error) {
      console.error(error);
      toast.error("failed to load albums");
    } finally {
      setLoading(false);
    }
  };
  const removeAlbum = async (albumId) => {
    setLoading(true);
    try {
      const response = await albumsAPI.remove(albumId);
      console.log(response);
      if (response.status === 204) {
        
        toast.success("Album removed successfully");
      } else {
        toast.error("failed to remove album");
      }
      fetchAlbums();
    } catch (error) {
      console.error(error);
      toast.error("failed to remove album");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlbums();
    console.log(data);
  }, []);
  return (
    <DashBoard activeMenu="List Albums">
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-61px)]">
          <div className="w-16 h-16 place-self-center border-4  border-gray-400 border-t-green-800 rounded-full animate-spin "></div>
        </div>
      ) : (
        <div className="p-6">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Albums Library
            </h1>
            <p className="text-gray-600">Manage your album collection</p>
          </div>
          {/* Table container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Table header */}
            <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center  text-white font-semibold">
                <div className="col-span-2 flex items-center  gap-2">
                  <Image className="w-4 h-4" />
                  <span>Cover</span>
                </div>
                <div className="col-span-3">Album Name</div>
                <div className="col-span-3 flex items-center  gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Theme
                </div>
                <div className="col-span-2 flex items-center ">Actions</div>
              </div>
            </div>
            {/* Table body */}
            <div className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <div className="px-6 py-12 text-center ">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                  <p className="text-gray-500 text-lg">No albums found</p>
                  <p className="text-gray-400 text-sm">
                    Add some albums to get started
                  </p>
                </div>
              ) : (
                data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* album image */}
                      <div className="col-span-2">
                        <div className="w-12 h-12 rounded-lg shadow-lg transition-shadow duration-200 overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      {/* album name */}
                      <div className="col-span-3">
                        <p className="font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                      </div>
                      {/* album description */}
                      <div className="col-span-3">
                        <p className=" text-gray-600 truncate">
                          {item.description || "no description"}
                        </p>
                      </div>
                      {/* album color */}

                      <div className="col-span-2">
                        <div className=" flex items-center gap-2 ">
                          <div
                            style={{ backgroundColor: item.bgColour }}
                            title={`Theam color : ${item.bgColour}`}
                            className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                          ></div>
                          <span className="text-xs text-gray-500 font-mono">
                            {item.bgColour}
                          </span>
                        </div>
                      </div>
                      {/* actions btn */}
                      <div className="col-span-2 flex justify-center">
                        <button
                          onClick={() => removeAlbum(item._id)}
                          title="Delete Album"
                          className="inline-flex items-center justify-center  w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200 group"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* footer stats */}
          {data.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Total Albums :
                  <span className="font-semibold text-gray-900">
                    {data.length}
                  </span>
                </span>
                <span>
                  Last Updated :
                  <span className="font-semibold text-gray-900">Just Now</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </DashBoard>
  );
}

export default ListAlbum;

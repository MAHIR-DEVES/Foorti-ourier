"use client";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCamera } from "react-icons/fa";
const Profile = () => {
  const [image, setImage] = useState("");

  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  return (
    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center border-b border-gray">
      <div className="text-center ">
        <input
          type="file"
          name="image"
          id="image_input"
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          onClick={handleUploadImage}
          className="w-[100px] h-[100px] cursor-pointer rounded-full border border-[#e5eaf2] flex items-center justify-center"
        >
          {image === "" ? (
            <CgProfile className="text-[10rem] text-[#e5eaf2]" />
          ) : (
            <img
              src={image}
              alt="image"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>

        <FaCamera
          className="text-4xl cursor-pointer -mt-10 text-secondary"
          onClick={handleUploadImage}
        />
      </div>
    </div>
  );
};

export default Profile;

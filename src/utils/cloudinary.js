import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../api/config";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";
import React from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeImage } from "../store/slices/recipeSlice";

export const ImageUpload = () => {
  const dispatch = useDispatch();
  const { recipeImage } = useSelector((state) => state.recipe);
  //   const [image, setImage] = React.useState("");
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(updateRecipeImage(response.data.secure_url));
    event.target.value = "";
  };
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 200,
          backgroundColor: "#ffffffc8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   paddingX: "30px",
        }}
      >
        <input
          className="image-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          // onClick={() => document.querySelector("input[type=file]").click()}
        />
        {recipeImage && (
          <CloudinaryContext
            className="image-dev"
            cloudName={CLOUDINARY_CLOUD_NAME}
          >
            <Image className="image-dev" publicId={recipeImage} crop="fill" />
          </CloudinaryContext>
        )}
      </Box>
    </>
  );
};
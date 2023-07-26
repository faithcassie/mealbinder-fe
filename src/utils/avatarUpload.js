import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../api/config";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";
import React from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatarUrl } from "../store/slices/userSlice";

export const AvatarUpload = () => {
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector((state) => state.user);

  const handleAvatarUpload = async (event) => {
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
    dispatch(updateAvatarUrl(response.data.secure_url));
    event.target.value = "";
  };
  return (
    <Container
      component="div"
      sx={{
        width: { xs: "100%", md: "50%" },
        mx: "auto",
        marginY: 5,
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
      }}
    >
      {avatarUrl && (
        <Box
          sx={{
            width: { xs: "250px", md: "300px" },
            height: { xs: "250px", md: "300px" },
            borderRadius: { xs: 40, md: 40 },
            // backgroundColor: "#00000010",
            backgroundImage: { avatarUrl },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mb: 3,
            mx: { xs: "auto", md: 3 },
            mt: 3,
          }}
        >
          {avatarUrl && (
            <CloudinaryContext cloudName={CLOUDINARY_CLOUD_NAME}>
              <Image className="avatar-img" publicId={avatarUrl} crop="fill" />
            </CloudinaryContext>
          )}
        </Box>
      )}
      <input
        className="avatar-input"
        type="file"
        accept="image/*"
        onChange={(e) => handleAvatarUpload(e)}
      />
    </Container>
  );
};

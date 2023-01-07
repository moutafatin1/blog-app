export const handleUploadImage =  async (image:Blob) : Promise<{secure_url : string}> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blogs3");
    const response = await  fetch(
      "https://api.cloudinary.com/v1_1/dxv8dzviq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    return response.json()
  
  };
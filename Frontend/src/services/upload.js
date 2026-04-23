const handleUpload = async () => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("petId", petId);
  formData.append("title", title);

  await axios.post("/api/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
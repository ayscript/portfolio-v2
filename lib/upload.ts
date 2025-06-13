async function upload(imageFile: File) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "ml_default");

  const cloudName = "dgetbfevu"

  let imgData;

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
        imgData = data.secure_url
    })
    .catch((error) => console.error("Error:", error));

    return imgData
}

export default upload
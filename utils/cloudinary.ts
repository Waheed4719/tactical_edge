// utils/cloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "testing-1"); // Replace with your Cloudinary upload preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dhfipezsq/image/upload", // Replace with your Cloudinary URL
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};

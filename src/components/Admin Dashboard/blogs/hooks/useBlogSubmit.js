import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Adjust to your backend URL

export const useBlogSubmit = (token, isEditMode, onSubmitCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData, submittedStatus) => {
    setIsLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();

      // Append standard fields
      formDataObj.append("title", formData.title);
      formDataObj.append("school", formData.school);
      formDataObj.append("event", formData.event);
      formDataObj.append("date", formData.date);
      formDataObj.append("content", formData.content);
      formDataObj.append("status", submittedStatus);

      // Handle thumbnail file or existing URL
      if (formData.thumbnail?.file) {
        formDataObj.append("thumbnail", formData.thumbnail.file);
      } else if (isEditMode && typeof formData.thumbnail === "string") {
        // If editing and thumbnail is just a string (URL), send it back as is
        formDataObj.append("thumbnail", formData.thumbnail);
      } else if (
        isEditMode &&
        formData.thumbnail?.url &&
        !formData.thumbnail.file
      ) {
        // If editing, thumbnail is object {url: string, file: null}, send URL
        formDataObj.append("thumbnail", formData.thumbnail.url);
      } // If not editing and no file, thumbnail is not appended

      // Handle gallery files and existing URLs (more complex in edit mode)
      const existingGalleryUrls = [];
      if (formData.gallery && formData.gallery.length > 0) {
        formData.gallery.forEach((item) => {
          if (item.file) {
            // New file to upload
            formDataObj.append("gallery", item.file);
          } else if (item.original && !item.file) {
            // Existing item (represented as object with URL)
            existingGalleryUrls.push(item.original);
          } else if (typeof item === "string") {
            // Existing item (represented as URL string)
            existingGalleryUrls.push(item);
          }
        });
      }

      // Inform backend about existing gallery images during edits
      if (isEditMode) {
        // Backend needs to compare this list with the existing gallery on the server
        // to determine which images were removed by the user.
        formDataObj.append(
          "existingGalleryUrls",
          JSON.stringify(existingGalleryUrls)
        );
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (isEditMode && formData.id) {
        response = await axios.put(
          `${API_URL}/events/${formData.id}`,
          formDataObj,
          config
        );
      } else {
        response = await axios.post(`${API_URL}/events`, formDataObj, config);
      }

      if (onSubmitCallback) {
        onSubmitCallback(response.data); // Pass response data to callback
      }
    } catch (err) {
      console.error("Error submitting blog:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`); // Keep basic alert for now
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};

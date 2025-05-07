import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Adjust to your backend URL

export const useBlogSubmit = (token, isEditMode, onSubmitCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData, submittedStatus = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();

      // Append standard fields
      formDataObj.append("title", formData.title);
      formDataObj.append("school", formData.school);
      formDataObj.append("event", formData.event);

      // Ensure proper date format (YYYY-MM-DD) for MySQL date field
      if (formData.dateISO) {
        formDataObj.append("date", formData.dateISO);
      } else if (formData.date) {
        // Try to convert the date string to ISO format if possible
        try {
          const parts = formData.date.split(" ");
          if (parts.length === 3) {
            const months = {
              Januari: "01",
              Februari: "02",
              Maret: "03",
              April: "04",
              Mei: "05",
              Juni: "06",
              Juli: "07",
              Agustus: "08",
              September: "09",
              Oktober: "10",
              November: "11",
              Desember: "12",
            };
            const day = parseInt(parts[0]).toString().padStart(2, "0");
            const month = months[parts[1]];
            const year = parts[2];
            if (day && month && year) {
              formDataObj.append("date", `${year}-${month}-${day}`);
            } else {
              formDataObj.append("date", formData.date);
            }
          } else {
            formDataObj.append("date", formData.date);
          }
        } catch (e) {
          console.error("Error parsing date:", e);
          formDataObj.append("date", formData.date);
        }
      } else {
        // If no date provided, use current date
        const today = new Date();
        const isoDate = today.toISOString().split("T")[0];
        formDataObj.append("date", isoDate);
      }

      formDataObj.append("content", formData.content);

      // Ensure status is preserved from the form data, falling back to defaults only if necessary
      // Priority: 1. submittedStatus (if provided), 2. formData.status, 3. "published" as last resort
      formDataObj.append(
        "status",
        submittedStatus || formData.status || "published"
      );

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
      throw new Error(errorMessage); // Throw to prevent any continuation that might cause double submission
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};

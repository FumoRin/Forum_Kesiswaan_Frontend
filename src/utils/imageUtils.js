/**
 * Utility functions for handling image URLs
 */

/**
 * Transforms backend image URLs to correct format based on environment
 * @param {string} url - The original image URL from backend
 * @returns {string} - The transformed URL
 */
export const getImageUrl = (url) => {
  if (!url) return null;

  // If it's already an absolute URL (https://, http://, //)
  if (url.match(/^(https?:)?\/\//)) {
    return url;
  }

  // If it's a local backend URL (starts with /uploads)
  if (url.includes("/uploads/")) {
    // In production, use placeholder images
    if (import.meta.env.PROD) {
      // Extract a unique identifier from the URL to get consistent images
      const hash = url.split("/").pop().split("-")[0];
      const id = parseInt(hash?.substring(0, 3), 16) % 30 || 1;
      return `https://picsum.photos/id/${1000 + id}/800/600`;
    }

    // In development, transform to use backend URL
    return `http://localhost:3000${url.startsWith("/") ? url : `/${url}`}`;
  }

  // For any other relative URLs
  return url;
};

/**
 * Processes HTML content and replaces all image URLs
 * @param {string} content - The HTML content
 * @returns {string} - The processed HTML with updated image URLs
 */
export const processContentImages = (content) => {
  if (!content) return "";

  // Replace image src attributes
  return content.replace(/src="([^"]+)"/g, (match, url) => {
    const processedUrl = getImageUrl(url);
    return `src="${processedUrl}"`;
  });
};

export default {
  getImageUrl,
  processContentImages,
};

# Forum Kesiswaan Cimahi - Frontend

This is the frontend application for Forum Kesiswaan Cimahi, a platform for accessing documentation of activities from all schools in Cimahi City.

## Features

- Browse events from schools in Cimahi
- Search and filter events by type, school, and date
- View detailed event information and galleries

## Static Data Deployment

This project has been configured to use static data, making it easy to deploy to platforms like Vercel without requiring a backend server. The static data is stored in the `src/data` directory.

### Image Handling

For static deployments, the application automatically handles images that were previously served from the backend:

1. Images referenced in the database with local URLs (e.g., `http://localhost:3000/uploads/file-123.jpg`)
2. Images embedded in HTML content
3. Gallery images

The utility in `src/utils/imageUtils.js` handles this transformation:

- In development mode, it will try to connect to your local backend
- In production mode, it will replace backend image URLs with placeholder images from Picsum Photos

To use your own images in production:

1. Upload your images to a service like Cloudinary, Imgur, or AWS S3
2. Update the image URLs in `src/data/events.js` to point to your hosted images

## Deployment to Vercel

### Prerequisites

- A [Vercel](https://vercel.com) account
- [Git](https://git-scm.com/) installed on your computer
- [Node.js](https://nodejs.org/) (v14 or later) and npm installed

### Steps to Deploy

1. **Fork or clone this repository**

   ```bash
   git clone <repository-url>
   cd Forum_Kesiswaan_Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Test the application locally**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173` (or the port shown in your terminal) to make sure everything works correctly.

4. **Deploy to Vercel**

   Option 1: Using Vercel CLI

   ```bash
   # Install Vercel CLI if you haven't already
   npm install -g vercel

   # Deploy
   vercel
   ```

   Option 2: Using Vercel Dashboard

   - Push your code to a GitHub repository
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings (the defaults should work fine)
   - Click "Deploy"

5. **Configure environment variables (if needed)**

   If you need to add any environment variables, you can do so in the Vercel project settings.

## Development

### Project Structure

- `src/data/` - Contains static data files used for deployment
- `src/components/` - React components
- `src/assets/` - Static assets like images

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Notes

- This version uses static data for deployment, which means the content is fixed and won't change without redeployment
- To update the content, modify the files in `src/data/events.js` and redeploy
- For a fully dynamic application, you would need to deploy the backend server separately and update the API service to use the live API endpoints

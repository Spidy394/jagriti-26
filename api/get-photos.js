import axios from 'axios';

export default async function handler(req, res) {
  const { folderId } = req.query;

  if (!folderId) {
    return res.status(400).json({ error: 'folderId is required' });
  }

  // Use the secure backend environment variable
  // If we are still using VITE_DRIVE_API locally, fall back to it for smooth transition
  const apiKey = process.env.DRIVE_API || process.env.VITE_DRIVE_API;

  if (!apiKey) {
    console.error("DRIVE_API key is missing in environment variables.");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const googleDriveUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id)&pageSize=1000&key=${apiKey}`;
    
    const response = await axios.get(googleDriveUrl);
    const data = response.data;
    
    // Send cache headers (Vercel edge caching)
    // Cache for 1 hour on the CDN edge, and 5 minutes in the browser
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in get-photos handler:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    return res.status(status).json({ error: 'Failed to fetch from Google Drive API' });
  }
}

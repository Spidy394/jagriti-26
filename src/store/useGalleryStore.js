import { create } from 'zustand';
import axios from 'axios';

export const useGalleryStore = create((set, get) => ({
  isGalleryOpen: false,
  selectedYear: null,
  lightboxImg: null,
  isLightboxLoaded: false,
  visibleCount: 15,
  isLoading: false,
  displayPhotos: [],
  categoryCache: {},
  imageStates: {},

  // Basic Setters
  setIsGalleryOpen: (isOpen) => set({ isGalleryOpen: isOpen }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setLightboxImg: (img) => set({ lightboxImg: img, isLightboxLoaded: false }),
  setIsLightboxLoaded: (isLoaded) => set({ isLightboxLoaded: isLoaded }),
  setVisibleCount: (count) => set({ visibleCount: count }),
  incrementVisibleCount: (amount) => set((state) => ({ visibleCount: state.visibleCount + amount })),
  setImageLoaded: (photo, isLoaded) => set((state) => ({
    imageStates: {
      ...state.imageStates,
      [photo]: { ...state.imageStates[photo], isLoaded }
    }
  })),
  setImageSpan: (photo, span) => set((state) => ({
    imageStates: {
      ...state.imageStates,
      [photo]: { ...state.imageStates[photo], span }
    }
  })),
  
  // Reset when closing gallery
  resetGallery: () => set({
    isGalleryOpen: false,
    selectedYear: null,
    lightboxImg: null,
    isLightboxLoaded: false,
    visibleCount: 15,
    displayPhotos: [],
    imageStates: {},
  }),

  // Async Thunk for loading photos
  loadPhotos: async (activeData) => {
    if (!activeData) return;
    
    set({ isLoading: true, displayPhotos: [] });
    
    const fetchFolderPhotos = async (folderId) => {
      const { categoryCache } = get();
      if (categoryCache[folderId]) return categoryCache[folderId];
      if (!folderId || folderId.includes("YOUR_FOLDER_ID_HERE")) return [];

      try {
        // Now calling our secure Vercel serverless function
        const res = await axios.get(`/api/get-photos?folderId=${folderId}`);
        
        if (res.data && res.data.files) {
          const ids = res.data.files.map((f) => f.id);
          set((state) => ({
            categoryCache: { ...state.categoryCache, [folderId]: ids }
          }));
          return ids;
        }
      } catch (e) {
        console.error("Error fetching folder", folderId, e);
      }
      return [];
    };

    let newPhotos = [];

    // Fetch all categories in parallel
    const processCategory = async (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return await fetchFolderPhotos(val);
      if (typeof val === "object" && val !== null) {
        const subPromises = Object.values(val).map(subVal => processCategory(subVal));
        const subResults = await Promise.all(subPromises);
        return subResults.flat();
      }
      return [];
    };

    const categories = Object.values(activeData.categories);
    const results = [];
    
    // Process categories in chunks of 3 to prevent API rate limit issues
    for (let i = 0; i < categories.length; i += 3) {
      const chunk = categories.slice(i, i + 3);
      const chunkResults = await Promise.all(chunk.map(processCategory));
      results.push(...chunkResults);
    }
    
    newPhotos = results.flat();
    
    // Shuffle to mix all categories together
    for (let i = newPhotos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPhotos[i], newPhotos[j]] = [newPhotos[j], newPhotos[i]];
    }

    set({ displayPhotos: newPhotos, isLoading: false });
  }
}));

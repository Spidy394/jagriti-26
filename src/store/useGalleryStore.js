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
        const apiKey = import.meta.env.VITE_DRIVE_API;
        if (!apiKey) {
          console.error("VITE_DRIVE_API is missing!");
          return [];
        }
        const res = await axios.get(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id)&pageSize=1000&key=${apiKey}`
        );
        
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
    const allPromises = Object.values(activeData.categories).map(
      async (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string") return await fetchFolderPhotos(val);
        return [];
      }
    );
    
    const results = await Promise.all(allPromises);
    newPhotos = results.flat();
    
    // Shuffle to mix all categories together
    for (let i = newPhotos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPhotos[i], newPhotos[j]] = [newPhotos[j], newPhotos[i]];
    }

    set({ displayPhotos: newPhotos, isLoading: false });
  }
}));

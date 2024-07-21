import { create } from 'zustand';

const useUrlStore = create((set) => ({
  songUrl: '',
  songUrls: [], // Initialize with an empty string
  like:null,
  cursongindex:0,

  setSongUrl: (url) => set({ songUrl: url }),
  // You can add other relevant actions (e.g., clearSongUrl) as needed
  addSongUrl: (url) => set((state) => ({ songUrls: [...state.songUrls, url] })),

  tlike: (val) => set((state) => ({ like:val})),

  setSongindex: (i) => set({ cursongindex: i }),

}));

export default useUrlStore;
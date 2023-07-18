import { create } from 'zustand';

interface Announcement {
  id: number;
  title: string;
  description: string;
}

interface AnnouncementStore {
  announcements: Announcement[];
  fetchAnnouncements: () => Promise<void>;
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  resetForm: () => void;
}

const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  title: '',
  description: '',
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  announcements: [],

  fetchAnnouncements: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/posts`);
      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }
      const data = await response.json();
      set({ announcements: data });
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  },
  

  resetForm: () => {
    set({ title: '', description: '' });
  },
}));

export default useAnnouncementStore;

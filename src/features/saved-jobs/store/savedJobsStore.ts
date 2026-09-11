"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedJobsState {
  ids: string[];
  saveJob: (id: string) => void;
  unsaveJob: (id: string) => void;
  toggleJob: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearAll: () => void;
}

export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, getState) => ({
      ids: [],
      saveJob: (id) =>
        set((state) =>
          state.ids.includes(id) ? state : { ids: [...state.ids, id] }
        ),
      unsaveJob: (id) =>
        set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
      toggleJob: (id) => {
        const { ids, saveJob, unsaveJob } = getState();
        if (ids.includes(id)) unsaveJob(id);
        else saveJob(id);
      },
      isSaved: (id) => getState().ids.includes(id),
      clearAll: () => set({ ids: [] }),
    }),
    { name: "saved-jobs" }
  )
);
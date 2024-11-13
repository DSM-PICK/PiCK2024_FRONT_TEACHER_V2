import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeRoomState {
  dropdownInfo: {
    grade: number;
    class_num: number;
    tab?: number;
  } | null;
  setDropdownInfo: (info: {
    grade: number;
    class_num: number;
    tab: number;
  }) => void;
}

const useDropdownInformation = create(
  persist<HomeRoomState>(
    (set) => ({
      dropdownInfo: null,
      setDropdownInfo: (info) => set({ dropdownInfo: info }),
    }),
    {
      name: "dropdownInfo",
      getStorage: () => localStorage,
    }
  )
);

export default useDropdownInformation;

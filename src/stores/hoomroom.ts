import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeRoomState {
  teacherInfo: {
    grade: number;
    class_num: number;
    name: string;
  } | null;
  setTeacherInfo: (info: {
    grade: number;
    class_num: number;
    name: string;
  }) => void;
}

const useHomeRoomInformation = create(
  persist<HomeRoomState>(
    (set) => ({
      teacherInfo: null,
      setTeacherInfo: (info) => set({ teacherInfo: info }),
    }),
    {
      name: "home-room-info",
      getStorage: () => localStorage,
    }
  )
);

export default useHomeRoomInformation;

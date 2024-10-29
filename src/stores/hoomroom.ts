import { create } from "zustand";

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

const useHomeRoomInformation = create<HomeRoomState>((set) => ({
  teacherInfo: null,
  setTeacherInfo: (info) => set({ teacherInfo: info }),
}));

export default useHomeRoomInformation;

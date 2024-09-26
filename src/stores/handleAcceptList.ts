import create from "zustand";

interface AcceptListSelectionState {
  selectedStudents: string[];
  selectedStudentName: string[];
  handleAcceptListClick: (id: string, name: string) => void;
}

const useAcceptListSelectionStore = create<AcceptListSelectionState>((set) => ({
  selectedStudents: [],
  selectedStudentName: [],

  handleAcceptListClick: (id: string, name: string) =>
    set((state) => {
      const isStudentSelected = state.selectedStudents.includes(id);

      if (isStudentSelected) {
        return {
          selectedStudents: state.selectedStudents.filter(
            (selectedStudent) => selectedStudent !== id
          ),
          selectedStudentName: state.selectedStudentName.filter(
            (selectedStudentName) => selectedStudentName !== name
          ),
        };
      } else {
        return {
          selectedStudents: [...state.selectedStudents, id],
          selectedStudentName: [...state.selectedStudentName, name],
        };
      }
    }),
}));

export default useAcceptListSelectionStore;

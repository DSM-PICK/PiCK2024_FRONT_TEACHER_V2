import create from "zustand";
interface AcceptListSelectionState {
  selectedStudents: string[];
  selectedStudentName: string[];
  handleAcceptListClick: (id: string, name: string) => void;
  resetSelection: () => void;
}
const useSelectionStore = create<AcceptListSelectionState>((set) => ({
  selectedStudents: [],
  selectedStudentName: [],
  handleAcceptListClick: (id: string, name: string): void =>
    set((state) => {
      const isStudentSelected = state.selectedStudents.includes(id);
      const updatedStudents = isStudentSelected
        ? state.selectedStudents.filter(
            (selectedStudent) => selectedStudent !== id
          )
        : [...state.selectedStudents, id];
      const updatedNames = isStudentSelected
        ? state.selectedStudentName.filter(
            (selectedStudentName) => selectedStudentName !== name
          )
        : [...state.selectedStudentName, name];
      return {
        selectedStudents: updatedStudents,
        selectedStudentName: updatedNames,
      };
    }),
  resetSelection: () =>
    set(() => ({
      selectedStudents: [],
      selectedStudentName: [],
    })),
}));

export default useSelectionStore;

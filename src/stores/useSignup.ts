import { create } from "zustand";

interface Form {
  secretKey: string;
  email: string;
  code: string;
  password: string;
  passwordCheck: string;
  isHomeroom: boolean;
  grade: number;
  classNum: number;
  name: string;
  deviceToken: string;
}

type Errors = Partial<
  Record<
    | "secretKey"
    | "email"
    | "code"
    | "password"
    | "passwordCheck"
    | "name"
    | "gradeClass"
    | "global",
    string
  >
>;

interface UIState {
  isSend: boolean;
  isEmailLocked: boolean;
}

interface SignupState {
  form: Form;
  errors: Errors;
  ui: UIState;
  setForm: (field: keyof Form, value: string | number | boolean) => void;
  setError: (field: keyof Errors, message: string) => void;
  clearError: (field: keyof Errors) => void;
  resetErrors: () => void;
  setUI: (field: keyof UIState, value: boolean) => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  form: {
    secretKey: "",
    email: "",
    code: "",
    password: "",
    passwordCheck: "",
    isHomeroom: false,
    grade: 1,
    classNum: 1,
    name: "",
    deviceToken: "",
  },
  errors: {},
  ui: {
    isSend: false,
    isEmailLocked: false,
  },
  setForm: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),
  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),
  clearError: (field) =>
    set((state) => {
      const next = { ...state.errors };
      delete next[field];
      return { errors: next };
    }),
  resetErrors: () => set({ errors: {} }),
  setUI: (field, value) =>
    set((state) => ({
      ui: { ...state.ui, [field]: value },
    })),
}));

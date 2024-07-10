import { createGlobalStyle } from "styled-components";

export const theme = {
  color: {
    normal: {
      white: "#fff",
      black: "#141414",
    },
    error: {
      50: "#ffe7e6",
      300: "#ff7679",
      500: "#ff3b32",
      800: "#ff261f",
    },
    main: {
      50: "#f2eafe",
      100: "#e0cbfe",
      200: "#cba8fd",
      300: "#b685fc",
      400: "#a66afb",
      500: "#9650fa",
      600: "#8e49f9",
      700: "#8340f9",
      800: "#7937f8",
      900: "#6827f6",
    },
    gray: {
      50: "#F1F1F2",
      100: "#dddcdd",
      200: "#c6c5c7",
      300: "#afadb1",
      400: "#9d9ca0",
      500: "#8c8a8f",
      600: "#848287",
      700: "#79777c",
      800: "#6f6d72",
      900: "#5c5a60",
    },
  },
  font: {
    heading: {
      1: {
        size: "42px",
        fontWeight: "600",
      },
      2: {
        size: "32px",
        fontweight: "600",
      },
      3: {
        size: "24px",
        fontweight: "600",
      },
      4: {
        size: "20px",
        fontweight: "600",
      },
    },
    subTitle: {
      1: {
        size: "18px",
        fontweight: "500",
      },
      2: {
        size: "16px",
        fontweight: "500",
      },
      3: {
        size: "14px",
        fontweight: "500",
      },
    },
    body: {
      1: {
        size: "14px",
        fontweight: "500",
      },
      2: {
        size: "12px",
        fontweight: "500",
      },
      3: {
        size: "10px",
        fontweight: "500",
      },
    },
    caption: {
      1: {
        size: "16px",
        fontweight: "400",
      },
      2: {
        size: "12px",
        fontweight: "400",
      },
    },
    label: {
      1: {
        size: "16px",
        fontweight: "500",
      },
      2: {
        size: "12px",
        fontweight: "500",
      },
    },
    button: {
      1: {
        size: "16px",
        fontweight: "400",
      },
      2: {
        size: "12px",
        fontweight: "500",
      },
    },
  },
  "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
};

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    user-select: none;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.color.gray[400]};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
`;

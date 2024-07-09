import { RouterProvider } from "react-router-dom";
import { Router } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyle, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

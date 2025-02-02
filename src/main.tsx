import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Signin } from "@/components/Signin.tsx";
import { Signup } from "@/components/Signup.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AlertComponent } from "./components/Alert.tsx";
import { AlertContextProvider } from "./lib/AlertContextProvider.tsx";
import { ProtectedRoute } from "./lib/ProtectedRoute.tsx";
import { AuthContextProvider } from "./lib/AuthContextProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <AlertComponent />
        <ReactQueryDevtools />
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <App />
                  </ProtectedRoute>
                }
              />
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </AlertContextProvider>
    </QueryClientProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { CurrencyProvider } from "./context/CurrencyContext";

import "./index.css";

createRoot(
    document.getElementById("root")
).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <AccessibilityProvider>
                        <CurrencyProvider>
                            <App />
                        </CurrencyProvider>
                    </AccessibilityProvider>
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
);
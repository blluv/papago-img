import ReactDOM from "react-dom/client";
import "./style.css";

import { createBrowserRouter, Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SettingScreen } from "./screens/SettingScreen";
import { MainScreen } from "./screens/MainScreen";
import { ProcessingScreen } from "./screens/ProcessingScreen";
import { FileListProvider } from "./contexts/FileListContext";

function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainScreen />} />
        <Route path="/settings" element={<SettingScreen />} />
        <Route path="/processing" element={<ProcessingScreen />} />
      </Routes>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <FileListProvider>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  </FileListProvider>
);

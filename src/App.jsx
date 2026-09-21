import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./pages/layouts";
import Landing from "./pages/Landing";
import AuthLogin from "./pages/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AppRoutes from "./components/AppRoutes";
import Overview from "./pages/AuthScreen/Overview";
import ArchiveScreen from "./pages/AuthScreen/ArchiveScreen";
import TrackScreen from "./pages/AuthScreen/TrackScreen";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppRoutes />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="/archive" element={<ArchiveScreen />} />
          <Route path="/track" element={<TrackScreen />} />
        </Route>

        <Route path="/" element={<SharedLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth/login" element={<AuthLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

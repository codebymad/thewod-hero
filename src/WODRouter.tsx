import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WODPlanner from "./pages/WODPlanner";

function WodAppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/wodplanner" element={<WODPlanner />} />

            {/* Unknown routes */}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

export default WodAppRouter;
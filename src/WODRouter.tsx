import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WODPlanner from "./pages/WODPlanner";
import LoginPage from "./pages/LoginPage";
import { WODRouterPrivate } from "./WODRouterPrivate";
import WorkoutBuilder from "./pages/WorkoutBuilder";
import WorkoutBuilderNew from "./pages/WorkoutBuilderNew";
import ProgramsPage from "./pages/ProgramsPage";

interface WodAppRouterProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

function WodAppRouter({ isAuthenticated, setIsAuthenticated }: WodAppRouterProps) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<LoginPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />

            <Route path="/home" element={<WODRouterPrivate isAuthenticated={isAuthenticated}><HomePage /></WODRouterPrivate>} />
            <Route path="/wodplannerold" element={<WODRouterPrivate isAuthenticated={isAuthenticated}><WODPlanner /></WODRouterPrivate>} />
            <Route path="/wodplannerold1" element={<WODRouterPrivate isAuthenticated={isAuthenticated}><WorkoutBuilder /></WODRouterPrivate>} />
            <Route path="/wodplanner" element={<WODRouterPrivate isAuthenticated={isAuthenticated}><WorkoutBuilderNew /></WODRouterPrivate>} />
            <Route path="/programs" element={<WODRouterPrivate isAuthenticated={isAuthenticated}><ProgramsPage /></WODRouterPrivate>} />

            <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    );
}

export default WodAppRouter;
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import SearchPage from "./pages/SearchPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage /></Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route
                path="/search/:city"
                element={
                    <Layout showHero={false}>
                        <SearchPage />
                    </Layout>
                }
            />
            <Route path="/detail/:id" element={<Layout showHero={false}><RestaurantDetailsPage /></Layout>} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/user-profile" element={<Layout showHero={false}><UserProfilePage /></Layout>} />
                <Route path="/manage-restaurant" element={<Layout showHero={false}><ManageRestaurantPage /></Layout>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;
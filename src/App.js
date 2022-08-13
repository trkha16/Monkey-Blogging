import { AuthProvider } from "./contexts/auth-context";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<SignUpPage></SignUpPage>}
                    ></Route>
                    <Route
                        path="/sign-in"
                        element={<SignInPage></SignInPage>}
                    ></Route>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route
                        path="*"
                        element={<NotFoundPage></NotFoundPage>}
                    ></Route>
                    <Route
                        path="/:slug"
                        element={<PostDetailsPage></PostDetailsPage>}
                    ></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;

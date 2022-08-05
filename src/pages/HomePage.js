import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function HomePage() {
    const handleSignOut = () => {
        signOut(auth);
    };

    return <button onClick={handleSignOut}>Sign out</button>;
}

export default HomePage;

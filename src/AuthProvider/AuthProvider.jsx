import React, { createContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    getAuth, 
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    TwitterAuthProvider,
    OAuthProvider
} from 'firebase/auth';
import { app } from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const instagramSignIn = () => {
        const provider = new OAuthProvider('instagram.com');
        return signInWithPopup(auth, provider);
    }

    const twitterSignIn = () => {
        const provider = new TwitterAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        instagramSignIn,
        twitterSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

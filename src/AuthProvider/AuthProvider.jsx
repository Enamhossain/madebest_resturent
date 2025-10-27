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
import useAxiosPublic from '../hooks/axiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);


// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()
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

            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
                    .catch(error => {
                        console.error('Error posting user info:', error);
                    });
            } else {
                // User is not logged in, clear token
                localStorage.removeItem('access-token');
            }

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

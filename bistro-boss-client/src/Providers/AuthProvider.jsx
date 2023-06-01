import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleprovider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googlSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleprovider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // get and set token
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token)
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = { user, loading, createUser, signIn, logOut, updateUserProfile, googlSignIn }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
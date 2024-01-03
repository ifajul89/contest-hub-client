import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const loggedUser = { email: currentUser.email };
                axiosPublic.post("/jwt", loggedUser).then((res) => {
                    console.log(res.data);
                });
            }
        });
        return () => {
            return unsubscribe;
        };
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        updateUser,
        logInUser,
        googleLogIn,
        logOutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;

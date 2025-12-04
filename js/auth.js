import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const registerUser = async (email, password, fullName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: fullName
        });
        
        // Create user document in Firestore for email preferences
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: fullName,
            createdAt: new Date().toISOString(),
            preferences: {
                emailNotifications: true,
                transactionAlertThreshold: 500,
                weeklyReports: true,
                monthlyReports: true
            }
        });
        
        return user;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

export const subscribeToAuthChanges = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user is currently signed in");
        }

        // Check if user signed in with Google
        const isGoogleUser = user.providerData.some(
            provider => provider.providerId === 'google.com'
        );

        if (isGoogleUser) {
            throw new Error("Cannot change password for Google sign-in users. Please manage your password through your Google account.");
        }

        if (!user.email) {
            throw new Error("User email not found");
        }

        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);
    } catch (error) {
        throw error;
    }
};

export const deleteUserAccount = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user is currently signed in");
        }

        await deleteUser(user);
    } catch (error) {
        throw error;
    }
};

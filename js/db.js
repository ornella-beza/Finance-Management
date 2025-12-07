import { db, auth } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    onSnapshot, 
    deleteDoc, 
    doc,
    orderBy,
    serverTimestamp,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const COLLECTION_NAME = 'transactions';

export const addTransaction = async (transaction) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        await addDoc(collection(db, COLLECTION_NAME), {
            ...transaction,
            userId: user.uid,
            createdAt: serverTimestamp(),
            amount: parseFloat(transaction.amount)
        });
    } catch (error) {
        console.error("Error adding transaction: ", error);
        throw error;
    }
};

export const subscribeToTransactions = (callback) => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
        collection(db, COLLECTION_NAME), 
        where("userId", "==", user.uid),
        orderBy("date", "desc"),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const transactions = [];
        snapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() });
        });
        callback(transactions);
    });
};

// Categories Management
const CATEGORIES_COLLECTION = 'categories';

export const subscribeToCategories = (callback) => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
        collection(db, CATEGORIES_COLLECTION), 
        where("userId", "==", user.uid),
        orderBy("name", "asc")
    );

    return onSnapshot(q, (snapshot) => {
        const categories = [];
        snapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() });
        });
        
        // If no categories exist, initialize defaults
        if (categories.length === 0) {
            initializeDefaultCategories(user.uid);
        } else {
            callback(categories);
        }
    });
};

export const addCategory = async (category) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        await addDoc(collection(db, CATEGORIES_COLLECTION), {
            ...category,
            userId: user.uid,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error adding category: ", error);
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
        await updateDoc(categoryRef, data);
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
};

const initializeDefaultCategories = async (userId) => {
    const defaultCategories = [
        { name: 'Salary', type: 'income', color: '#10B981' },
        { name: 'Freelance', type: 'income', color: '#3B82F6' },
        { name: 'Food', type: 'expense', color: '#F59E0B' },
        { name: 'Transportation', type: 'expense', color: '#EF4444' },
        { name: 'Entertainment', type: 'expense', color: '#8B5CF6' },
        { name: 'Utilities', type: 'expense', color: '#6B7280' },
        { name: 'Other', type: 'expense', color: '#9CA3AF' }
    ];

    for (const cat of defaultCategories) {
        await addDoc(collection(db, CATEGORIES_COLLECTION), {
            ...cat,
            userId: userId,
            createdAt: serverTimestamp()
        });
    }
};

export const deleteTransaction = async (id) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw error;
    }
};

export const updateTransaction = async (id, updates) => {
    try {
        const transactionRef = doc(db, COLLECTION_NAME, id);
        // Ensure amount is a number if it's being updated
        if (updates.amount) {
            updates.amount = parseFloat(updates.amount);
        }
        await updateDoc(transactionRef, updates);
    } catch (error) {
        console.error("Error updating transaction: ", error);
        throw error;
    }
};

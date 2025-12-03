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

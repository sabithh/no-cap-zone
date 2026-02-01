// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, query, limitToLast } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7FKFuhA0c_nHytJuQK12YDk21lXC8Mwk",
    authDomain: "no-cap-zone.firebaseapp.com",
    projectId: "no-cap-zone",
    storageBucket: "no-cap-zone.firebasestorage.app",
    messagingSenderId: "418262725511",
    appId: "1:418262725511:web:8742bd8a935d58e9195922",
    measurementId: "G-VWSLSTG1VT",
    databaseURL: "https://no-cap-zone.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to save user choice
export function saveUserChoice(name, choice) {
    const usersRef = ref(db, 'users');
    console.log('Attempting to save to Firebase:', { name, choice }); // Debug log

    return push(usersRef, {
        name: name,
        choice: choice,
        timestamp: new Date().toISOString()
    })
        .then(() => console.log('Successfully saved to Firebase!'))
        .catch((error) => console.error('Error saving to Firebase:', error));
}

// Function to subscribe to "Recent Gays" list (option2)
export function subscribeToRecentGays(onData, onError) {
    const usersRef = ref(db, 'users');
    // Get last 50 entries
    const q = query(usersRef, limitToLast(50));

    onValue(q, (snapshot) => {
        const data = snapshot.val();
        console.log('Firebase Data Received:', data); // Debug log

        if (!data) {
            onData([]);
            return;
        }

        // Convert object to array
        const usersArray = Object.values(data);

        // Filter for option2, sort by date desc, take top 10
        const recentGays = usersArray
            .filter(user => user.choice === 'option2')
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 10);

        onData(recentGays);
    }, (error) => {
        console.error('Firebase Error:', error);
        if (onError) onError(error);
    });
}

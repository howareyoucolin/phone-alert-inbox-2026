import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

// Firebase configuration from google-services.json
const firebaseConfig = {
    apiKey: 'AIzaSyDZcDM6TwPruKQXEnduA_C75hpK4cRi8zU',
    authDomain: 'coolin-app.firebaseapp.com',
    projectId: 'coolin-app',
    storageBucket: 'coolin-app.firebasestorage.app',
    messagingSenderId: '657945890798',
    appId: '1:657945890798:android:b410b6494a5e919f99c8ff',
}

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

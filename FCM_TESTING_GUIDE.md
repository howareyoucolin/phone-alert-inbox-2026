# Firebase Cloud Messaging (FCM) Testing Guide

## Step 1: Get Your FCM Token
The app will display your **push token** on the screen. This is your device's unique FCM token.

Example token format: `ExponentPushToken[...long string...]`

## Step 2: Send a Message from Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **coolin-app**
3. Go to **Messaging** (left sidebar)
4. Click **Send your first message** or **New campaign**
5. Fill in:
   - **Notification title**: "Test from Firebase"
   - **Notification text**: "This is a real FCM message"
6. Click **Send test message**
7. Paste your **push token** from the app
8. Click **Test**

The notification should appear on your phone immediately!

## Step 3: Send from Your Backend (Node.js)

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function sendNotification(deviceToken) {
    try {
        const response = await admin.messaging().send({
            notification: {
                title: 'New Message Posted!',
                body: 'Colin posted a new message',
            },
            data: {
                messageId: '123',
                timestamp: new Date().toISOString(),
            },
            token: deviceToken,
        });
        console.log('Message sent:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Usage:
sendNotification('YOUR_PUSH_TOKEN_HERE');
```

## What You'll See
- Notifications appear in the **notification center** of your phone
- Tap them to handle in the app
- You can log the notification data in the `setupNotificationHandlers()` function

## Notes
- Local test button: For testing the UI locally (won't appear in Firebase)
- FCM messages: Real messages sent through Firebase (will appear in Console & notification center)

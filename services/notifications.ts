import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

// Request notification permissions
export const requestNotificationPermissions = async () => {
    if (!Device.isDevice) {
        console.log('Must use physical device for push notifications')
        return null
    }

    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!')
            return null
        }

        const projectId = 'coolin-app' // Your Firebase project ID
        const expoPushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data
        console.log('Expo Push Token:', expoPushToken)
        return expoPushToken
    } catch (error) {
        console.error('Error requesting notification permissions:', error)
        return null
    }
}

// Set up notification handler
export const setupNotificationHandlers = () => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification)
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response)
        // Handle notification tap here
    })

    return () => {
        Notifications.removeNotificationSubscription(notificationListener)
        Notifications.removeNotificationSubscription(responseListener)
    }
}

// Test notification (for development)
export const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Test Notification',
            body: 'This is a test notification!',
            data: { test: true },
        },
        trigger: { seconds: 2 },
    })
}

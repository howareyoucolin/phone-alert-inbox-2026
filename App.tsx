import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { requestNotificationPermissions, setupNotificationHandlers, sendTestNotification } from './services/notifications'

export default function App() {
    const [pushToken, setPushToken] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const initNotifications = async () => {
            const unsubscribe = setupNotificationHandlers()
            const token = await requestNotificationPermissions()
            setPushToken(token)
            setIsReady(true)
            return unsubscribe
        }

        initNotifications()
    }, [])

    const handleTestNotification = async () => {
        try {
            await sendTestNotification()
            Alert.alert('Success', 'Test notification scheduled!')
        } catch (error) {
            Alert.alert('Error', 'Failed to send test notification')
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alert Inbox App</Text>

            {isReady ? (
                <>
                    <Text style={styles.status}>✓ Notifications Ready</Text>
                    {pushToken && (
                        <>
                            <Text style={styles.label}>Your Push Token:</Text>
                            <Text style={styles.token}>{pushToken}</Text>
                        </>
                    )}
                    <Button title="Send Test Notification" onPress={handleTestNotification} />
                </>
            ) : (
                <Text>Loading notifications...</Text>
            )}

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    status: {
        fontSize: 16,
        color: 'green',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10,
    },
    token: {
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        textAlign: 'center',
    },
})

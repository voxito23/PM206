import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import { StatusBar } from "react-native";

export default function TabsLayout() {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
            <Tabs
                screenOptions={{
                    headerStyle: { backgroundColor: '#FFFFFF' },
                    headerTintColor: '#1E293B',
                    headerTitleStyle: { fontWeight: 'bold', color: '#1E293B' },
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                        borderTopColor: '#E2E8F0',
                        borderTopWidth: 1,
                    },
                    tabBarActiveTintColor: '#2563EB',
                    tabBarInactiveTintColor: '#94A3B8',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                    },
                }}
            >
                <Tabs.Screen name="index" options={{ title: "Inicio", href: null }} />

                <Tabs.Screen name="alta" options={{ title: "Registro",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add" size={22} color={color} />
                    ),
                }} />
                <Tabs.Screen name="consulta" options={{ title: "Usuarios",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={22} color={color} />
                    ),
                }} />
            </Tabs>
        </>
    );
}
import { useState } from "react";
import { Stack } from "expo-router";
import SplashScreen from "../screens/SplashScreen";

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true);

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#FFFFFF' },
                headerTintColor: '#1E293B',
                headerTitleStyle: { fontWeight: 'bold', color: '#1E293B' },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen 
                name="(tabs)" 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="detalles" 
                options={{ 
                    title: "Detalles del Usuario",
                    headerShown: true,
                }} 
            />
            <Stack.Screen 
                name="DetallesUsuario" 
                options={{ 
                    title: "Detalles del Usuario",
                    headerShown: true,
                }} 
            />
            <Stack.Screen 
                name="editar" 
                options={{ 
                    title: "Editar Usuario",
                    headerShown: true,
                }} 
            />
            <Stack.Screen 
                name="EditarUsuario" 
                options={{ 
                    title: "Editar Usuario",
                    headerShown: true,
                }} 
            />
        </Stack>
    );
}

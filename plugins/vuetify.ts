import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {

    // const savedTheme = localStorage.getItem('theme') || 'light'
    const vuetify = createVuetify({
        theme: {
            themes: {
                light: {
                    // Light theme customization
                    dark: false, // This defines the light theme as default
                    colors: {
                        background: '#ffffff', // Background color
                        surface: '#ffffff', // Surface color
                        primary: '#1976D2', // Primary color
                        secondary: '#424242', // Secondary color
                        accent: '#82B1FF', // Accent color
                        error: '#FF5252', // Error color
                        info: '#2196F3', // Info color
                        success: '#4CAF50', // Success color
                        warning: '#FB8C00' // Warning color
                    }
                },
                dark: {
                    // Dark theme customization
                    dark: true, // Dark mode activated
                    colors: {
                        background: '#1c232b', // Dark background color
                        surface: '#2a2e38', // Dark surface color
                        primary: '#7580ff', // Primary color for dark mode
                        secondary: '#ff9800', // Secondary color for dark mode
                        accent: '#FF4081', // Accent color for dark mode
                        error: '#ff5252', // Error color for dark mode
                        info: '#2196F3', // Info color for dark mode
                        success: '#4CAF50', // Success color for dark mode
                        warning: '#FB8C00', // Warning color for dark mode
                        text: '#ffffff' // Text color for dark mode
                    }
                }
            },
            defaultTheme: 'dark', // Default theme, light or dark
        }
    })

    // Use Vuetify in the Nuxt application
    app.vueApp.use(vuetify)
})

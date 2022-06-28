// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'

const myCustomLightTheme = {
    dark: false,
    colors: {
        primary: '#3f51b5',
        secondary: '#8a8d93',
        accent: '#0d6efd',
        error: '#e01f3d',
        info: '#16b1ff',
        success: '#56ca00',
        warning: '#ffb400',
    }
}

export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    }
})

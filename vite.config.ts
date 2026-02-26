import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        base: command === 'build' ? '/site-casamento-will-e-sarah/' : '/',
    }
})

// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/portfolio-js/',
    plugins: [react(), svgr()],
    define: {
        'process.env': {}, // Define an empty process.env to prevent errors
        'process.versions.node': '"v20.11.0"' // Ensure the version is a string
    },
    server: {
        host: '0.0.0.0',
        port: 3000, // Set the port to 3000
        open: true // Open the browser when the server starts
    },
    build: {
        outDir: 'build' // Set the output directory to build
    }
});

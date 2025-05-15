import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";
import process from "node:process";

export default defineConfig({
    resolve: {
        alias: {
            "@/api": path.resolve(process.cwd(), 'src/api'),
            "@/app": path.resolve(process.cwd(), 'src/app'),
            "@/components": path.resolve(process.cwd(), 'src/components'),
            "@/ducks": path.resolve(process.cwd(), 'src/ducks'),
            "@/hooks": path.resolve(process.cwd(), 'src/hooks'),
            "@/slices": path.resolve(process.cwd(), 'src/slices'),
            "@/src": path.resolve(process.cwd(), 'src'),
            "@/types": path.resolve(process.cwd(), 'src/types'),
            "@/utils": path.resolve(process.cwd(), 'src/utils'),
        }
    },
    plugins: [react()],
    server: {
        port: 8080,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            }
        }
    }
})

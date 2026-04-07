import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react';
import path from "node:path";
import process from "node:process";
import {visualizer} from "rollup-plugin-visualizer";

const commonConfig = defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/api": path.resolve(process.cwd(), 'src/api'),
            "@/app": path.resolve(process.cwd(), 'src/app'),
            "@/components": path.resolve(process.cwd(), 'src/components'),
            "@/features": path.resolve(process.cwd(), 'src/features'),
            "@/hooks": path.resolve(process.cwd(), 'src/hooks'),
            "@/types": path.resolve(process.cwd(), 'src/types'),
            "@/utils": path.resolve(process.cwd(), 'src/utils'),
        }
    },
})

const serverConfig = defineConfig({
    server: {
        port: 8080,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            },
            '/api/user/v2/cookie-consent.png': {
                target: 'https://intranet.chums.com/api/user/v2/cookie-consent.png',
                changeOrigin: true,
            },
            '/images': {
                target: 'https://intranet.chums.com/',
                changeOrigin: true,
            }
        }
    }
})

// https://vite.dev/config/
export default defineConfig(({command, isSsrBuild}) => {
    if (command === 'serve') {
        return {
            ...commonConfig,
            ...serverConfig
        }
    }
    if (isSsrBuild) {
        return defineConfig({
            ...commonConfig,
            build: {
                outDir: 'dist-server',
                lib: {
                    entry: path.resolve(process.cwd(), 'src/server/index.ts'),
                    name: 'chums-ssr',
                    formats: ['es'],
                },
                emptyOutDir: true,
                rolldownOptions: {
                    input: path.resolve(process.cwd(), './src/server/index.ts'),
                    output: {
                        preserveModules: true,
                        // codeSplitting: false
                    },
                    shimMissingExports: true,
                },
                ssr: true,
                ssrManifest: true,
                ssrEmitAssets: true,
                manifest: true,
                sourcemap: false,
            },
            ssr: {
                resolve: {
                    conditions: ['development', 'browser'],
                    externalConditions: ['node']
                },
                optimizeDeps: {
                    holdUntilCrawlEnd: true,
                }
            }
        })
    }

    return defineConfig({
        ...commonConfig,
        build: {
            /**
             * @TODO: if using both server-side rendering and client side rendering, then dist-client may be more appropriate
             */
            outDir: 'dist',
            emptyOutDir: true,
            rolldownOptions: {
                input: './src/client/index.tsx',
                plugins: [visualizer({filename: 'stats.html', gzipSize: true})],
                output: {
                    codeSplitting: {
                        groups: [
                            {name: 'react', test: /node_modules\/(react|react-dom)\//, priority: 30},
                            {name: 'vendor-ui', test: /node_modules\/(react-bootstrap|@emption)\//, priority: 20},
                            {name: 'chums', test: /node_modules\/@chumsinc/, priority: 10},
                            {name: 'vendor', test: /node_modules/},
                        ]
                    }
                }
            },
            manifest: true,
            sourcemap: true,
        },
    })

})

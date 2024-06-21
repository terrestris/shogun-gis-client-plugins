import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ExamplePlugin',
      filename: 'index.js',
      exposes: {
        './FooterLinks': './src/FooterLinks/plugin'
      },
      shared: {
        react: {
          requiredVersion: '^18',
        },
        'react-dom': {
          requiredVersion: '^18',
        },
        'react-redux': {
          requiredVersion: '^8',
        },
        '@terrestris/react-geo': {
          requiredVersion: '^24',
        },
        'react-i18next': {
          requiredVersion: '^14',
        },
        'ol': {
          requiredVersion: '^9',
        }
      }
    }
  )],
  server: {
    host: '0.0.0.0',
    port: 9090,
  },
  build: {
    modulePreload: false,
    // The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of "es2020".
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import federation from "@originjs/vite-plugin-federation";
import config from './package.json';
const deps = config.dependencies;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ExamplePlugin',
      filename: 'index.js',
      exposes: {
        './FooterLinks': './src/FooterLinks/index.tsx'
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
  )
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
});

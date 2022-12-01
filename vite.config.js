import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    build: {
      rollupOptions: {
        input: [
          './src/lib/components/MIC-AccountBalance-DS.svelte',
          './src/lib/components/MIC-BillingSummary.svelte',
          './src/lib/components/MIC-BillSelectorAndDownload.svelte',
          './src/lib/components/MIC-HeaderInformation.svelte',
          './src/lib/components/MIC-ImportantMessage.svelte',
          './src/lib/components/MIC-Insights.svelte',
          './src/MIC-Wrapper.svelte'
        ],
        lib:{
          entry: './src/main.ts',
          name: 'MyLibrary',
        }
      }
    },
    plugins: [svelte({
      compilerOptions: {
        customElement: true
      }
    })]
  })]
})

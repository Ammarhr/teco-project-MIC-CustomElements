import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from 'postcss';
import sveltePreprocess from 'svelte-preprocess';
// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   dedupe: ['svelte-dnd-action', 'svelte-paginate', 'svelte-simple-modal']
  // },
  plugins: [svelte({
    // build: {

    //   rollupOptions: {
    //     input: [
    //       './src/lib/components/MIC-BalanceDetails.svelte',
    //       './src/lib/components/MIC-BillingSummary.svelte',
    //       './src/lib/components/MIC-BillSelectorAndDownload.svelte',
    //       './src/lib/components/MIC-HeaderInformation.svelte',
    //       './src/lib/components/MIC-ImportantMessage.svelte',
    //       './src/lib/components/MIC-Insights.svelte',
    //       './src/lib/components/MIC-BulkDownload.svelte',
    //       './src/lib/components/MIC-SunSelect.svelte',
    //       './src/lib/components/MIC-YearlyEnergy.svelte',
    //       './src/MIC-Wrapper.svelte'
    //     ],
    //     lib: {
    //       entry: './src/main.ts',
    //       name: 'MyLibrary',
    //     }
    //   },
    // },
    // compilerOptions: {
    //   customElement: true,
    //   // enableSourcemap: true,
    //   // sourcemap: true,
    // },
    // preprocess: sveltePreprocess({
    //   sourceMap: true,
    // }),
  }),
  ],
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ['src'],
    },
  }),
})
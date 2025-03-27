import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://eloychavez.dev',
  integrations: [mdx(), sitemap(), tailwind()],
  build: {
    hooks: {
      'done': async () => {
        const { execSync } = await import('child_process');
        try {
          // Ejecutar Pagefind y especificar el directorio de salida
          execSync('npx pagefind --source dist --bundle-dir _pagefind', { stdio: 'inherit' });
          console.log('Pagefind indexing completed successfully');
        } catch (error) {
          console.error('Error running Pagefind:', error);
        }
      },
    },
  },
});
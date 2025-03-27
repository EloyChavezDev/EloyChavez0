import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://astrofy-template.netlify.app',
  integrations: [mdx(), sitemap(), tailwind(), image(
    {
      serviceEntryPoint: '@astrojs/image/sharp',
      cacheDir: "./.cache/image",
      logLevel: 'debug',
    }
  )],
  build: {
    hooks: {
      'done': async () => {
        const { execSync } = await import('child_process');
        execSync('npx pagefind', { stdio: 'inherit' });
        // Copiar los archivos de Pagefind al directorio público
        const { copyFileSync } = await import('fs');
        const { join } = await import('path');
        try {
          copyFileSync(
            join(process.cwd(), '_pagefind', 'pagefind-ui.js'),
            join(process.cwd(), 'public', '_pagefind', 'pagefind-ui.js')
          );
        } catch (error) {
          console.error('Error copying Pagefind files:', error);
        }
      },
    },
  },
});
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import { copyFileSync, cpSync } from 'fs';
import { join } from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://eloychavez.dev',
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
        
        // Asegurarse de que el directorio _pagefind existe en public
        const publicPagefindDir = join(process.cwd(), 'public', '_pagefind');
        const pagefindDir = join(process.cwd(), '_pagefind');
        
        try {
          // Copiar todo el directorio _pagefind a public
          cpSync(pagefindDir, publicPagefindDir, { recursive: true, force: true });
          console.log('Pagefind files copied successfully');
        } catch (error) {
          console.error('Error copying Pagefind files:', error);
        }
      },
    },
  },
});
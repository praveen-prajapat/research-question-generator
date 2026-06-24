import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' makes the build use relative asset paths, so it works
// whether deployed at the root of a custom domain or under
// https://<user>.github.io/<repo>/ — no edits needed either way.
export default defineConfig({
  plugins: [react()],
  base: './',
})

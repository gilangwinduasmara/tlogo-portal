import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tlogo Portal',
    short_name: 'TlogoPortal',
    description: 'Aplikasi portal warga Tlogotangi',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { 
        src: '/android-launchericon-192-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-launchericon-512-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
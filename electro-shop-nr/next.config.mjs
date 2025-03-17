/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['humjokilfuelljbcfngl.supabase.co'], // Agrega el dominio de Supabase aquí
    }, 
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  
import type { NextConfig } from "next";

/**
 * Next.js configuration.
 * The physics library `ammo.js` imports the Node `fs` module, which is not
 * available in the browser. When bundling for the client we tell webpack to
 * treat `fs` as an empty module. This prevents the "Module not found: Can't
 * resolve 'fs'" error.
 *
 * Next.js 16 uses Turbopack by default. Providing an empty `turbopack`
 * configuration silences the warning that appears when a custom webpack
 * configuration is present.
 */
const nextConfig: NextConfig = {
  // Custom webpack configuration to provide fallbacks.
  webpack: (config, { isServer }) => {
    // Ensure the resolve and fallback objects exist.
    if (!config.resolve) {
      config.resolve = {} as any;
    }
    if (!config.resolve.fallback) {
      config.resolve.fallback = {} as any;
    }

    // Provide an empty mock for the 'fs' module on the client side.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  // Empty Turbopack config to avoid the default warning.
  turbopack: {},
};

export default nextConfig;

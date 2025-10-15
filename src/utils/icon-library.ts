import { registerIconLibrary } from './icon-registry';

// Re-export types and functions
export type { IconLibrary } from './icon-registry';
export { registerIconLibrary, unregisterIconLibrary, getIconLibrary, getIconLibraryNames } from './icon-registry';

/**
 * Setup default icon libraries using CDN sources
 * Automatically called when nat-ui is imported
 */
export function setupDefaultIconLibraries() {
  // Lucide Icons (Recommended - Modern, MIT licensed)
  registerIconLibrary('lucide', {
    resolver: (name: string) => {
      return `https://cdn.jsdelivr.net/npm/lucide-static@0.294.0/icons/${name}.svg`;
    },
    mutator: (svg: string) => {
      return svg.replace(/<svg/, '<svg fill="none"').replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    },
  });

  // Heroicons (Tailwind's official icons)
  registerIconLibrary('heroicons', {
    resolver: (name: string) => {
      return `https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/${name}.svg`;
    },
    mutator: (svg: string) => {
      return svg.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    },
  });

  // Tabler Icons (1950+ icons)
  registerIconLibrary('tabler', {
    resolver: (name: string) => {
      return `https://cdn.jsdelivr.net/npm/@tabler/icons@2.40.0/icons/${name}.svg`;
    },
    mutator: (svg: string) => {
      return svg.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    },
  });

  // Bootstrap Icons
  registerIconLibrary('bootstrap', {
    resolver: (name: string) => {
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/${name}.svg`;
    },
    mutator: (svg: string) => {
      return svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    },
  });

  // Set default library (Lucide)
  registerIconLibrary('default', {
    resolver: (name: string) => {
      return `https://cdn.jsdelivr.net/npm/lucide-static@0.294.0/icons/${name}.svg`;
    },
    mutator: (svg: string) => {
      return svg.replace(/<svg/, '<svg fill="none"').replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    },
  });
}

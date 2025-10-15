/**
 * Icon Library Registry System
 * Manages icon library resolvers and mutators
 */

export interface IconLibrary {
  /**
   * Function that returns the URL for an icon name
   */
  resolver: (name: string) => string;

  /**
   * Optional function to modify SVG content before rendering
   * Common use: Set currentColor for stroke/fill
   */
  mutator?: (svg: string) => string;
}

const getRegistry = (): Map<string, IconLibrary> => {
  if (typeof window !== 'undefined') {
    if (!(window as any).__iconLibraries) {
      (window as any).__iconLibraries = new Map<string, IconLibrary>();
    }
    return (window as any).__iconLibraries;
  }
  // Fallback for SSR
  if (!(globalThis as any).__iconLibraries) {
    (globalThis as any).__iconLibraries = new Map<string, IconLibrary>();
  }
  return (globalThis as any).__iconLibraries;
};

/**
 * Registers an icon library for use with nat-icon
 */
export function registerIconLibrary(name: string, library: IconLibrary) {
  getRegistry().set(name, library);
  console.log(`Registered icon library: ${name}`);
}

/**
 * Gets a registered icon library
 */
export function getIconLibrary(name: string): IconLibrary | undefined {
  return getRegistry().get(name);
}

/**
 * Unregisters an icon library
 */
export function unregisterIconLibrary(name: string) {
  getRegistry().delete(name);
}

/**
 * Gets all registered library names
 */
export function getIconLibraryNames(): string[] {
  return Array.from(getRegistry().keys());
}

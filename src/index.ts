/**
 * @fileoverview Entry point for nat-ui component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structures that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the README.md.
 */

// Export original utilities
export { format } from './utils/utils';

// Export icon system utilities
export { setupDefaultIconLibraries, registerIconLibrary, unregisterIconLibrary, getIconLibrary, getIconLibraryNames } from './utils/icon-library';

// Export icon types
export type { IconLibrary } from './utils/icon-library';

// Export all component types
export type * from './components.d.ts';

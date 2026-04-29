import { lazy } from "react";

/**
 * A wrapper for React.lazy that handles dynamic import failures.
 * This is especially useful for handling 'Failed to fetch dynamically imported module' errors
 * which occur when a new version of the app is deployed and the client has an old version cached.
 */
export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem("page-has-been-force-refreshed") || "false"
    );

    try {
      const component = await componentImport();
      // If we successfully loaded the component, reset the refresh flag
      window.sessionStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      console.error("Error loading component:", error);

      // Check if it's a dynamic import failure
      const isDynamicImportError = 
        error.message.includes("Failed to fetch dynamically imported module") ||
        error.message.includes("error loading dynamically imported module") ||
        error.name === "TypeError";

      if (isDynamicImportError && !pageHasBeenForceRefreshed) {
        // Mark that we are refreshing to avoid infinite loops if the error persists
        window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
        // Reload the page to get the latest bundle from the server
        window.location.reload();
      }

      // If we already refreshed once and it still fails, throw the error
      throw error;
    }
  });

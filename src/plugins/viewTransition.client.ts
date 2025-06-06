// Plugin to enable View Transition API
export default defineNuxtPlugin({
  name: "view-transition",
  enforce: "pre",
  setup() {
    // Check if the View Transitions API is supported
    if (!document.startViewTransition) {
      console.warn("View Transitions API is not supported in this browser.");
    } else {
      console.info("View Transitions API is enabled.");
    }
  },
});

// Type definitions for View Transitions API
interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
  };
}

interface CSSStyleDeclaration {
  viewTransitionName: string;
}

export const useNavigating = () => {
  const isNavigating = ref(false);

  const navigateWithLoading = (callback: () => void) => {
    isNavigating.value = true;
    callback();
  };

  return { isNavigating, navigateWithLoading };
};

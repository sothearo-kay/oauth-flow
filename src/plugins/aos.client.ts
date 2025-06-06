import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((nuxtApp) => {
  //  Wait till all suspense components in the app are resolved
  nuxtApp.hook("app:suspense:resolve", () => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });
  });
});

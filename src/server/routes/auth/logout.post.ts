export default defineEventHandler(async (event) => {
  deleteCookie(event, "auth-session");
  deleteCookie(event, "user-profile");

  return {
    success: true,
  };
});

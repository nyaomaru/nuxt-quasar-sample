export default defineEventHandler(async event => {
  const cookies = parseCookies(event);

  setCookie(event, 'refresh_token', '', { maxAge: -1, httpOnly: true, path: '/' });

  return { message: 'Logged out successfully' };
});

export function extractTokenFromCookie(cookieString: string) {
  const matches = cookieString.match(/accessToken=([^;]+)/);
  return matches ? matches[1] : null;
}

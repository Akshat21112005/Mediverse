import { authMiddleware } from '@clerk/nextjs';
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/api(.*)'
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    '/api/public'
  ],
});
 
export const config = {
  // Matcher ignoring _next/static, _next/image, favicon.ico, public folder
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
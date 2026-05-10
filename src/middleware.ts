import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isPublicRoute = createRouteMatcher(["/signin(.*)", "/ordbog(.*)"]);

export const onRequest = clerkMiddleware((auth, context) => {
  if (!isPublicRoute(context.request)) {
    const authObject = auth();
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }
  }
});
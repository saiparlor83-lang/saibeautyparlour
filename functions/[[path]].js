// Cloudflare Pages Function (Worker)
// Validates requested URLs against the beauty parlour SPA routes and course slugs.

const staticValidRoutes = new Set([
  '/',
  '/about',
  '/contact',
  '/gallery',
  '/course',
  '/courses',
  '/services/hair',
  '/services/skincare',
  '/services/makeup',
  '/services/nails-spa',
  '/services/wedding'
]);

const validCourseSlugs = new Set([
  'makeup-basic',
  'makeup-advanced',
  'makeup-diploma',
  'professional-makeup-artistry',
  'bridal-makeup',
  'party-event-makeup',
  'advanced-eye-makeup',
  'hd-makeup',
  'self-makeup',
  'professional-hair-styling',
  'bridal-hair-styling',
  'hair-cutting',
  'hair-coloring',
  'hair-treatment',
  'hair-straightening-smoothening',
  'professional-facial-skin-care',
  'advanced-skin-care',
  'facial-techniques',
  'cleanup-basic-skin-treatment',
  'manicure-pedicure',
  'nail-art',
  'gel-nail-art',
  'threading-waxing',
  'complete-beauty-salon-skills',
  'salon-management-customer-service'
]);

export async function onRequest(context) {
  const { request, env } = context;
  
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. Pass static asset requests directly to Cloudflare asset worker
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return env.ASSETS.fetch(request);
  }

  // 2. Normalize pathname: strip trailing slash except for root '/'
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  // Helper function to serve index.html with HTTP 200 for valid SPA routes
  const serveIndexHtml = () => {
    const indexUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(indexUrl);
  };

  // 3. Check static valid routes
  if (staticValidRoutes.has(normalizedPath)) {
    return serveIndexHtml();
  }

  // 4. Dynamic course route check: /courses/:slug
  if (normalizedPath.startsWith('/courses/')) {
    const slug = normalizedPath.slice('/courses/'.length);

    if (validCourseSlugs.has(slug)) {
      return serveIndexHtml();
    }
  }

  // 5. Invalid route -> let React render NotFoundPage with HTTP 404 status.
  const notFoundResponse = await serveIndexHtml();

  return new Response(notFoundResponse.body, {
    status: 404,
    statusText: 'Not Found',
    headers: notFoundResponse.headers
  });
}

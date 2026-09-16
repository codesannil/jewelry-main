/**
 * Aurelia Fine Jewelry - Client-Side Hash Router
 * Manages multi-page navigation (#home, #catalogue, #product, #compare, #new-arrivals, #about, #contact)
 */

export class Router {
  constructor(routes, defaultRoute = 'home') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.currentRoute = '';
    this.currentParams = {};

    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  init() {
    this.handleHashChange();
  }

  parseHash() {
    const hash = window.location.hash.slice(1) || this.defaultRoute;
    const [path, queryString] = hash.split('?');
    const params = {};

    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }

    return { path: path || this.defaultRoute, params };
  }

  handleHashChange() {
    const { path, params } = this.parseHash();
    this.currentRoute = path;
    this.currentParams = params;

    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav links
    this.updateActiveNavLinks(path);

    // Call route renderer
    const routeHandler = this.routes[path] || this.routes[this.defaultRoute];
    if (routeHandler) {
      routeHandler(params);
    }
  }

  updateActiveNavLinks(path) {
    document.querySelectorAll('[data-route]').forEach(el => {
      const targetRoute = el.getAttribute('data-route');
      if (targetRoute === path) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

  }

  navigate(route, params = {}) {
    let hash = `#${route}`;
    const query = new URLSearchParams(params).toString();
    if (query) {
      hash += `?${query}`;
    }
    window.location.hash = hash;
  }
}

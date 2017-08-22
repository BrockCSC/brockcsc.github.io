import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

interface RouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle;
}

export class RouterCache implements RouteReuseStrategy {
    private routesToCache: string[];
    private storedRoutes: { [key: string]: RouteStorageObject } = {};

    constructor() {
        // Determine which routes to cache
        this.routesToCache = ['events'];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        // Return false if navigating to another route than current
        return future.routeConfig === current.routeConfig;
    }

    private getFromRoot(snapshot: ActivatedRouteSnapshot): string {
        return snapshot.pathFromRoot
            .map(routeSnapshot => routeSnapshot.routeConfig)
            .filter(routeConfig => routeConfig !== null && routeConfig.path !== '')
            .map(routeConfig => routeConfig.path)
            .join('/');
    }

    // Should the route be stored?
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.routesToCache.indexOf(this.getFromRoot(route)) > -1;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const storedRoute: RouteStorageObject = {
            snapshot: route,
            handle: handle
        };
        const rootPath = this.getFromRoot(route);
        this.storedRoutes[rootPath] = storedRoute;
    }

    // Should the component state be restored?
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const rootPath = this.getFromRoot(route);
        // checks if the route has been previously stored
        return !!route.routeConfig && !!this.storedRoutes[rootPath];
    }

    // Retrieve the component state
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        const rootPath = this.getFromRoot(route);
        if (!route.routeConfig || !this.storedRoutes[rootPath]) {
            return null;
        }
        return this.storedRoutes[rootPath].handle;
    }
}

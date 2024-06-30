import { Router } from 'express';
import { UserRoutes } from '../Modules/User/User.Route';
import { ServiceRoutes } from '../Modules/Service/Service.Route';
import { SlotRoutes } from '../Modules/Slot/Slot.Route';

const router = Router();

interface RouteConfig {
  path: string;
  route: Router;
  children?: RouteConfig[];
}

const moduleRoutes: RouteConfig[] = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
    children: [
      {
        path: '/slots',
        route: SlotRoutes,
      },
    ],
  },
  // {
  //   path: '/slots',
  //   route: SlotRoutes,
  // },
];

const applyRoutes = (routes: RouteConfig[], parentPath = '') => {
  routes.forEach((route) => {
    const fullPath = `${parentPath}${route.path}`;
    router.use(fullPath, route.route);

    if (route.children) {
      applyRoutes(route.children, fullPath);
    }
  });
};

applyRoutes(moduleRoutes);
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

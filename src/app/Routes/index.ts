import { Router } from 'express';
import { UserRoutes } from '../Modules/User/User.Route';
import { ServiceRoutes } from '../Modules/Service/Service.Route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

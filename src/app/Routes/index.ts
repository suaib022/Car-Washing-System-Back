import { Router } from 'express';
import { UserRoutes } from '../Modules/User/User.Route';
import { ServiceRoutes } from '../Modules/Service/Service.Route';
import { SlotRoutes } from '../Modules/Slot/Slot.Route';
import { BookingRoutes } from '../Modules/Booking/Booking.Route';
import { UserBookingRoutes } from '../Modules/Booking/UserBookingsRoute';

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
  {
    path: '/slots/availability',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: UserBookingRoutes,
  },
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

export default router;

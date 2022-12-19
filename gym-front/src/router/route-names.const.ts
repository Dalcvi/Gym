export const RouteNames = {
  Home: {
    path: '/',
    name: 'Home',
  },
  Locations: {
    path: '/locations',
    name: 'Locations',
    children: {
      Trainers: {
        path: '/locations/:locationId/trainers',
        name: 'Trainers',
        getFullPath: (locationId: number) => `/locations/${locationId}/trainers`,
      },
    },
  },
  Trainer: {
    path: '/trainer/:trainerId',
    name: 'Trainer',
    getFullPath: (trainerId: string) => `/trainer/${trainerId}`,

  },
  AdminDashboard: {
    path: '/admin-dashboard',
    name: 'Admin dashboard',
  },
  Profile: {
    path: '/profile',
    name: 'Profile',
  },
} as const;

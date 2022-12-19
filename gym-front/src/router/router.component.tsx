import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AdminDashboardPage,
  BenefitsTable,
  GymsTable,
  PlansTable,
  UsersTable,
  BookingTable,
  GymTrainersTable,
  PlansBenefitsTable,
  UserBookingsTable,
} from '../admin-dashboard-page';
import { HomePage } from '../home-page';
import { LocationsPage } from '../locations-page';
import { RouteNames } from './route-names.const';
import { NavBar } from '../nav-bar';
import { AuthorizedUserProvider, UserProfile } from '../user';
import { GymTrainersPage } from '../gym-trainers-page';
import { TrainerPage } from '../trainer-page';

export const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={RouteNames.Home.path} element={<HomePage />} />
        <Route path={RouteNames.Locations.path} element={<LocationsPage />} />
        <Route path={RouteNames.Locations.children.Trainers.path} element={<GymTrainersPage />} />
        <Route path={RouteNames.Trainer.path} element={<TrainerPage />} />
        <Route
          path={RouteNames.Profile.path}
          element={
            <AuthorizedUserProvider>
              <UserProfile />
            </AuthorizedUserProvider>
          }
        />
        <Route
          path={RouteNames.AdminDashboard.path}
          element={
            <AuthorizedUserProvider>
              <AdminDashboardPage />
            </AuthorizedUserProvider>
          }
        >
          <Route index element={<UsersTable />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="gym-trainers" element={<GymTrainersTable />} />
          <Route path="benefits" element={<BenefitsTable />} />
          <Route path="plan-benefits" element={<PlansBenefitsTable />} />
          <Route path="plans" element={<PlansTable />} />
          <Route path="gyms" element={<GymsTable />} />
          <Route path="bookings" element={<BookingTable />} />
          <Route path="user-bookings" element={<UserBookingsTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

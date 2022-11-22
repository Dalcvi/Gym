import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AdminDashboardPage,
  BenefitsTable,
  GymsTable,
  PlansTable,
  UsersTable,
} from '../admin-dashboard-page';
import { BookingTable } from '../admin-dashboard-page/bookings-table';
import { GymTrainersTable } from '../admin-dashboard-page/gym-trainers-table';
import { PlansBenefitsTable } from '../admin-dashboard-page/plan-benefits-table';
import { UserBookingsTable } from '../admin-dashboard-page/user-bookings-table';
import { HomePage } from '../home-page';
import { LocationsPage } from '../locations-page';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />}>
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

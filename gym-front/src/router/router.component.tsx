import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AdminDashboardPage,
  BenefitsTable,
  GymsTable,
  PlansTable,
  UsersTable,
} from '../admin-dashboard-page';
import { BookingTable } from '../admin-dashboard-page/bookings-table';
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
          <Route path="benefits" element={<BenefitsTable />} />
          <Route path="plans" element={<PlansTable />} />
          <Route path="gyms" element={<GymsTable />} />
          <Route path="bookings" element={<BookingTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

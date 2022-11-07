import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home-page';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

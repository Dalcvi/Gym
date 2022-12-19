import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PricingSection } from './pricing-section';
import { UserGreeting } from './user-greeting';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash.includes('pricing')) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <UserGreeting />
      <PricingSection />
    </>
  );
};

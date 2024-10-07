import { render } from '@testing-library/react';
import App from './App';

test('renders banner image', () => {
  const { getByTestId } = render(<App />);
  const bannerImage = getByTestId('image-banner');
  expect(bannerImage).toBeInTheDocument();
  expect(bannerImage).toHaveAttribute('src', 'https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg');
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

const el = {
  image: 'https://via.placeholder.com/150',
  name: 'Test Recipe',
  rating: 4.5,
  tags: ['Tag1', 'Tag2', 'Tag3'],
  id: 1
};

test('renders the component Card & given props', () => {
  // Render the Card component with the test data
  const { getByText, getByAltText, getByTestId } = render(<Card el={el} />);

  // Check if the image is rendered
  const image = getByAltText('Test Recipe');
  expect(image).toHaveAttribute('src', el.image);

  // Check if the name is rendered
  expect(getByTestId(`title-recipe-${el.id}`)).toHaveTextContent(el.name);

  // Check if the rating is rendered
  expect(getByTestId(`rating-recipe-${el.id}`)).toHaveTextContent(el.rating.toString());

  // Check if the tags (only first two) are rendered
  el.tags.slice(0, 2).forEach(tag => {
    expect(getByTestId(`tag-recipe-${tag}`)).toBeInTheDocument();
  });

  // Check if the link is rendered with correct href
  const link = getByTestId(`link-recipe-${el.id}`);
  expect(link).toHaveAttribute('href', `https://dummyjson.com/recipes/${el.id}`);
});

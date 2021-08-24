import React from 'react';
import ErrorBoundary from '..';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ErrorBoundary', () => {
  test('should normally render the children', () => {
    const AnyComponent = () => <h1>My App</h1>;
    render(
      <ErrorBoundary FallbackComponent={() => <button>Oops</button>}>
        <AnyComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('heading')).toHaveTextContent('My App');
  });
  it('should normally render the FallbackComponent if error is caught in children', () => {
    const ComponentWithError = () => {
      throw Error('Unknown Error');
    };
    const FallbackComponent = () => <button>Oops</button>;

    jest.spyOn(global.console, 'error').mockImplementation(error => error);

    render(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ComponentWithError />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('button')).toHaveTextContent('Oops');
  });
});

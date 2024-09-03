import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import Cdp from '../Cdp'; 
import {cdpReducer} from '../../../redux/reducers/cdpReducer';

// Setup the mock store
const store = configureStore({
  reducer: {
    cdp: cdpReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
// beforeAll(() => {
//   global.matchMedia = global.matchMedia || function () {
//     return {
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//     };
//   };
// });


describe('Cdp Component', () => {
  test('renders loading state', () => {
    const loadingStore = configureStore({
      reducer: {
        cdp: () => ({ data: {}, loading: true, error: null })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

    render(
      <Provider store={loadingStore}>
        <Cdp />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test('renders error state', () => {
    const errorStore = configureStore({
      reducer: {
        cdp: () => ({ data: {}, loading: false, error: 'Failed to fetch data' })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

    render(
      <Provider store={errorStore}>
        <Cdp />
      </Provider>
    );

    expect(screen.getByText(/Error: Failed to fetch data/)).toBeInTheDocument();
  });

  test('renders data correctly', async () => {
    const mockData = {
      reportingYear: '2024',
      cdpScore: 'A',
      emissionDataList: [
        {
          scope1: '100',
          scope2LocationBased: '200',
          scope2MarketBased: '150'
        }
      ],
      annualSavingsList: [
        {
          initiativeCategory: 'Energy Efficiency',
          annualCo2Savings: '50',
          lifetimeOfInitiative: '10 years'
        }
      ],
      comments: 'Good progress on sustainability goals.',
      percentageOfIntensity: '10%'
    };

    const dataStore = configureStore({
      reducer: {
        cdp: () => ({ data: mockData, loading: false, error: null })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

    render(
      <Provider store={dataStore}>
        <Cdp />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/CDP Reporting Year/)).toHaveTextContent('2024');
      expect(screen.getByText(/CDP Score/)).toHaveTextContent('A');
      expect(screen.getByPlaceholderText(/Scope 1 Location Based \[C6\] - 1/)).toHaveValue('100');
      expect(screen.getByPlaceholderText(/Scope 2 Location Based \[C6.3\] - 1/)).toHaveValue('200');
      expect(screen.getByPlaceholderText(/Scope 2 Market Based \[C6.3\] - 1/)).toHaveValue('150');
      expect(screen.getByPlaceholderText(/Initiative Category - 1/)).toHaveValue('Energy Efficiency');
      expect(screen.getByPlaceholderText(/Annual CO2 Savings - 1/)).toHaveValue('50');
      expect(screen.getByPlaceholderText(/Lifetime of Initiative - 1/)).toHaveValue('10 years');
      expect(screen.getByText(/Comments/)).toHaveTextContent('Good progress on sustainability goals.');
      expect(screen.getByText(/Intensity % attributed for your company/)).toHaveTextContent('10%');
    });
  });
});
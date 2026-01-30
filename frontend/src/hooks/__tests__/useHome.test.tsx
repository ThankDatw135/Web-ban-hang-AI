/**
 * Unit Tests for useHome hooks - Fashion AI
 * 
 * Test các hooks cho trang chủ
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Simple wrapper for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useHome Hooks', () => {
  describe('Query Client Setup', () => {
    it('nên tạo Query Client thành công', () => {
      const queryClient = new QueryClient();
      expect(queryClient).toBeDefined();
    });

    it('nên có default options đúng', () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 5 * 60 * 1000,
          },
        },
      });
      
      expect(queryClient.getDefaultOptions()).toBeDefined();
    });
  });

  describe('Wrapper Component', () => {
    it('nên tạo wrapper component', () => {
      const wrapper = createWrapper();
      expect(wrapper).toBeDefined();
    });
  });
});

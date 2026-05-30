import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TrackTicketPage } from './TrackTicketPage';
import { useBookingStore } from '../store/useBookingStore';

// Mock the store and hooks
vi.mock('../store/useBookingStore', () => ({
  useBookingStore: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('TrackTicketPage', () => {
  const mockLookupTicket = vi.fn();
  const mockClearTrackedTicket = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useBookingStore).mockReturnValue({
      trackedTicket: null,
      trackError: null,
      lookupTicket: mockLookupTicket,
      clearTrackedTicket: mockClearTrackedTicket,
    } as any);
  });

  it('renders the form correctly', () => {
    render(<TrackTicketPage />);
    expect(screen.getByLabelText(/pnr_label/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Passenger Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('submits the form and calls lookupTicket with email', async () => {
    render(<TrackTicketPage />);
    
    const pnrInput = screen.getByLabelText(/pnr_label/i);
    const lastNameInput = screen.getByLabelText(/Passenger Last Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', { name: /track.cta/i });

    fireEvent.change(pnrInput, { target: { value: 'VNTG6K' } });
    fireEvent.change(lastNameInput, { target: { value: 'Laurence' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLookupTicket).toHaveBeenCalledWith('VNTG6K', 'Laurence', 'test@example.com');
    });
  });

  it('displays error message from store', () => {
    vi.mocked(useBookingStore).mockReturnValue({
      trackedTicket: null,
      trackError: 'Mock error message',
      lookupTicket: mockLookupTicket,
      clearTrackedTicket: mockClearTrackedTicket,
    } as any);

    render(<TrackTicketPage />);
    expect(screen.getByText('Mock error message')).toBeInTheDocument();
  });
});

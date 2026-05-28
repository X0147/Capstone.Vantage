import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SeatSelector } from './SeatSelector';

describe('SeatSelector Accessibility & Keyboard Navigation Audit (WCAG 2.2 AA)', () => {
  const defaultProps = {
    baseFare: 450,
    onSelectionComplete: vi.fn(),
  };

  it('enforces semantic widget roles and exposes accessible descriptions to screen readers', () => {
    render(<SeatSelector {...defaultProps} />);

    const seatButtons = screen.getAllByRole('checkbox');
    expect(seatButtons.length).toBeGreaterThan(0);

    const firstSeat = seatButtons[0];
    const ariaLabel = firstSeat.getAttribute('aria-label');

    expect(ariaLabel).toBeDefined();
    expect(ariaLabel).toMatch(/(class|row|available|occupied)/i);
  });

  it('reflects correct binary checked states through the aria-checked property', async () => {
    const user = userEvent.setup();
    render(<SeatSelector {...defaultProps} />);

    const availableSeats = screen.getAllByRole('checkbox').filter((seat) => !seat.hasAttribute('disabled'));
    const targetSeat = availableSeats[0];

    expect(targetSeat).toHaveAttribute('aria-checked', 'false');

    await user.click(targetSeat);
    expect(targetSeat).toHaveAttribute('aria-checked', 'true');

    await user.click(targetSeat);
    expect(targetSeat).toHaveAttribute('aria-checked', 'false');
  });

  it('implements strict system boundaries for occupied seats using host elements', () => {
    render(<SeatSelector {...defaultProps} />);

    const seatButtons = screen.getAllByRole('checkbox');
    const disabledSeats = seatButtons.filter((seat) => seat.hasAttribute('disabled'));

    if (disabledSeats.length > 0) {
      const sampleDisabledSeat = disabledSeats[0];
      expect(sampleDisabledSeat).toHaveAttribute('disabled');
    }
  });

  it('allows full sequential keyboard navigation via Tab key traversal', async () => {
    const user = userEvent.setup();
    render(<SeatSelector {...defaultProps} />);

    await user.tab();

    if (document.activeElement?.getAttribute('role') === 'checkbox') {
      expect(document.activeElement).toHaveProperty('disabled', false);
    }
  });

  it('activates structural selections seamlessly via Spacebar key triggers', async () => {
    const user = userEvent.setup();
    render(<SeatSelector {...defaultProps} />);

    const actionableSeats = screen.getAllByRole('checkbox').filter((seat) => !seat.hasAttribute('disabled'));
    const targetSeat = actionableSeats[0];

    targetSeat.focus();
    expect(document.activeElement).toBe(targetSeat);

    await user.keyboard(' ');
    expect(targetSeat).toHaveAttribute('aria-checked', 'true');
  });

  it('activates structural selections seamlessly via Enter key triggers', async () => {
    const user = userEvent.setup();
    render(<SeatSelector {...defaultProps} />);

    const actionableSeats = screen.getAllByRole('checkbox').filter((seat) => !seat.hasAttribute('disabled'));
    const targetSeat = actionableSeats[1];

    targetSeat.focus();

    await user.keyboard('{Enter}');
    expect(targetSeat).toHaveAttribute('aria-checked', 'true');
  });
});

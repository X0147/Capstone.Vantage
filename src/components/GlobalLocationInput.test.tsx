import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlobalLocationInput } from '../components/GlobalLocationInput';

describe('GlobalLocationInput Accessibility & Keyboard Navigation Suite', () => {
  const defaultProps = {
    label: 'Departure Airport',
    placeholder: 'Search airport...',
    value: '',
    onChange: vi.fn(),
  };

  it('establishes the baseline structural ARIA tree for a WCAG-compliant combobox', () => {
    render(<GlobalLocationInput {...defaultProps} />);
    const input = screen.getByRole('combobox');
    
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('navigates the suggestion index sequentially via ArrowDown and ArrowUp events', async () => {
    const user = userEvent.setup();
    render(<GlobalLocationInput {...defaultProps} />);
    
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'a');

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(1);

    // Travel down the suggestion list
    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    // Travel back up
    await user.keyboard('{ArrowUp}');
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
  });

  it('collapses the dropdown instantly and clears state flags when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<GlobalLocationInput {...defaultProps} />);
    
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'a');
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
});

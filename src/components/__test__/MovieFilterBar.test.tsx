import { Sort } from '@/interfaces';
import { customRender } from '@/lib/tests';
import { fireEvent, RenderResult } from '@testing-library/react';
import { useState } from 'react';
import { MovieFilterBar } from '../MovieFilterBar';

describe('Unit | Movie Filter Bar', () => {
  let screen: RenderResult;

  beforeEach(() => {
    const Component = () => {
      const [sort, setSort] = useState<Sort>('ASC');
      return (
        <>
          <MovieFilterBar sort={sort} onSort={setSort} />
          <div data-testid="sort">Sort: {sort}</div>
        </>
      );
    };

    screen = customRender(<Component />);
  });

  it('should render all options', () => {
    expect(screen.getByText(/descending popularity/i)).toBeVisible();
    expect(screen.getByText(/ascending popularity/i)).toBeVisible();
  });

  it('should update on change', () => {
    const select = screen.getByTestId(/select/i);
    fireEvent.change(select, { target: { value: 'DESC' } });
    expect(screen.getAllByText(/sort: desc/i)).toHaveLength(1);
  });
});

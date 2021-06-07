import { Sort } from '@/interfaces';
import { Select, HStack } from '@chakra-ui/react';

export interface MovieFilterBarProps {
  onSort: (sort: Sort) => void;
  sort: Sort;
}

export const MovieFilterBar = ({ onSort, sort }: MovieFilterBarProps) => (
  <HStack>
    <Select
      data-testid="select"
      placeholder="Sort"
      value={sort}
      onChange={(event) => onSort(event.target.value as Sort)}
    >
      <option value="DESC">Descending Popularity (High to Low)</option>
      <option value="ASC">Ascending Popularity (Low to High)</option>
    </Select>
  </HStack>
);

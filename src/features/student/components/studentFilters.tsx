import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
    };

    onChange(newFilter);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = value.split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _name_like: undefined,
      city: undefined,
      _sort: undefined,
      _order: undefined,
      _page: 1,
    };

    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              inputRef={searchRef}
              defaultValue={filter.name_like}
              label="Search by name"
              onChange={handleSearchChange}
              id="searchByName"
              endAdornment={<SearchIcon />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl size="small" fullWidth>
            <InputLabel id="Filter-by-city">Filter by city</InputLabel>
            <Select
              labelId="Filter-by-city"
              value={filter.city || ''}
              label="Filter by city"
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              label="Sort"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              <MenuItem value="name.asc">Name tăng dần</MenuItem>
              <MenuItem value="name.desc">Name giảm dần</MenuItem>
              <MenuItem value="mark.asc">Điểm thấp</MenuItem>
              <MenuItem value="mark.desc">Điểm cao</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button onClick={handleClearFilter} variant="contained" color="warning">
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

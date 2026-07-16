import React from 'react';
import type { FilterOptions } from '../types/calligraphy-competition';

interface CalligraphyCompetitionFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  availableStyles: string[];
  availableYears: number[];
  availableHalfYears: string[];
}

const CalligraphyCompetitionFilters: React.FC<CalligraphyCompetitionFiltersProps> = ({
  filters,
  onFilterChange,
  availableStyles,
  availableYears,
  availableHalfYears
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...filters, 
      style: e.target.value || undefined 
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...filters, 
      year: e.target.value ? parseInt(e.target.value) : undefined 
    });
  };

  const handleHalfYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      ...filters, 
      halfYear: e.target.value || undefined 
    });
  };

  const clearFilters = () => {
    onFilterChange({
      searchQuery: '',
      style: undefined,
      year: undefined,
      halfYear: undefined
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== ''
  ).length;

  return (
    <div className="competition-filters">
      <div className="filters-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span>🔍 篩選器</span>
        {activeFiltersCount > 0 && (
          <span className="active-filters-badge">{activeFiltersCount}</span>
        )}
        <button 
          className="expand-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="filters-content">
          <div className="filter-group">
            <label htmlFor="search">搜索:</label>
            <input
              type="text"
              id="search"
              value={filters.searchQuery || ''}
              onChange={handleSearchChange}
              placeholder="比賽名稱、獎項..."
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="style">書體:</label>
            <select
              id="style"
              value={filters.style || ''}
              onChange={handleStyleChange}
              className="filter-select"
            >
              <option value="">所有書體</option>
              {availableStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year">年份:</label>
            <select
              id="year"
              value={filters.year || ''}
              onChange={handleYearChange}
              className="filter-select"
            >
              <option value="">所有年份</option>
              {availableYears.sort((a, b) => b - a).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="halfYear">半年:</label>
            <select
              id="halfYear"
              value={filters.halfYear || ''}
              onChange={handleHalfYearChange}
              className="filter-select"
            >
              <option value="">所有半年</option>
              {availableHalfYears.map((halfYear) => (
                <option key={halfYear} value={halfYear}>{halfYear}</option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button 
              className="clear-filters-btn"
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
            >
              清除所有篩選器
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalligraphyCompetitionFilters;

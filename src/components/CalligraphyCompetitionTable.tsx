import React from 'react';
import type { CompetitionTableData, SortField, SortDirection, FilterOptions } from '../types/calligraphy-competition';

interface CalligraphyCompetitionTableProps {
  data: CompetitionTableData[];
  onSort: (field: SortField, direction: SortDirection) => void;
  currentSort: { field: SortField; direction: SortDirection } | null;
  filters: FilterOptions;
}

const CalligraphyCompetitionTable: React.FC<CalligraphyCompetitionTableProps> = ({
  data,
  onSort,
  currentSort,
  filters
}) => {
  const getSortIcon = (field: SortField) => {
    if (currentSort?.field !== field) {
      return <span style={{ opacity: 0.3 }}>↕</span>;
    }
    return currentSort.direction === 'asc' ? '↑' : '↓';
  };

  const getSortDirection = (field: SortField): SortDirection => {
    if (currentSort?.field !== field) return 'asc';
    return currentSort.direction === 'asc' ? 'desc' : 'asc';
  };

  const handleSort = (field: SortField) => {
    const direction = getSortDirection(field);
    onSort(field, direction);
  };

  return (
    <div className="competition-table-container">
      <div className="table-responsive">
        <table className="competition-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('chineseName')}>
                <div className="sortable-header">
                  中文名稱 {getSortIcon('chineseName')}
                </div>
              </th>
              <th onClick={() => handleSort('englishName')}>
                <div className="sortable-header">
                  English Name {getSortIcon('englishName')}
                </div>
              </th>
              <th onClick={() => handleSort('formattedResult')}>
                <div className="sortable-header">
                  獎項 {getSortIcon('formattedResult')}
                </div>
              </th>
              <th onClick={() => handleSort('style')}>
                <div className="sortable-header">
                  書體 {getSortIcon('style')}
                </div>
              </th>
              <th onClick={() => handleSort('formattedDate')}>
                <div className="sortable-header">
                  日期 {getSortIcon('formattedDate')}
                </div>
              </th>
              <th onClick={() => handleSort('year')}>
                <div className="sortable-header">
                  年份 {getSortIcon('year')}
                </div>
              </th>
              <th onClick={() => handleSort('halfYear')}>
                <div className="sortable-header">
                  半年 {getSortIcon('halfYear')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="competition-row">
                  <td className="chinese-name">{item.chineseName}</td>
                  <td className="english-name">{item.englishName}</td>
                  <td className="result-cell">
                    {Array.isArray(item.result) ? (
                      <ul className="result-list">
                        {item.result.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      item.result
                    )}
                  </td>
                  <td className="style-cell">{item.style}</td>
                  <td className="date-cell">{item.formattedDate}</td>
                  <td className="year-cell">{item.year}</td>
                  <td className="half-year-cell">{item.halfYear}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data">
                  沒有符合條件的比賽記錄
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {data.length > 0 && (
        <div className="table-summary">
          顯示 {data.length} 條記錄
          {filters.searchQuery && <span> (搜索: "{filters.searchQuery}")</span>}
          {filters.style && <span> (書體: {filters.style})</span>}
          {filters.year && <span> (年份: {filters.year})</span>}
          {filters.halfYear && <span> (半年: {filters.halfYear})</span>}
        </div>
      )}
    </div>
  );
};

export default CalligraphyCompetitionTable;

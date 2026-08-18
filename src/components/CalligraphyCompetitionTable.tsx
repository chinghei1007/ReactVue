import React from 'react';
import type { CompetitionTableData, SortField, SortDirection, FilterOptions } from '@/types/calligraphy-competition';

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
      return <span className="competition-sort-indicator">↕</span>;
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
    <div className="competition-table-content">
      <div className="competition-table-scroll">
        <table className="competition-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('chineseName')}>
                <div className="competition-sortable-header">
                  中文名稱 {getSortIcon('chineseName')}
                </div>
              </th>
              <th onClick={() => handleSort('englishName')}>
                <div className="competition-sortable-header">
                  English Name {getSortIcon('englishName')}
                </div>
              </th>
              <th onClick={() => handleSort('formattedResult')}>
                <div className="competition-sortable-header">
                  獎項 {getSortIcon('formattedResult')}
                </div>
              </th>
              <th onClick={() => handleSort('style')}>
                <div className="competition-sortable-header">
                  書體 {getSortIcon('style')}
                </div>
              </th>
              <th onClick={() => handleSort('formattedDate')}>
                <div className="competition-sortable-header">
                  日期 {getSortIcon('formattedDate')}
                </div>
              </th>
              <th onClick={() => handleSort('year')}>
                <div className="competition-sortable-header">
                  年份 {getSortIcon('year')}
                </div>
              </th>
              <th onClick={() => handleSort('halfYear')}>
                <div className="competition-sortable-header">
                  半年 {getSortIcon('halfYear')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="competition-cell--chinese-name">{item.chineseName}</td>
                  <td className="competition-cell--english-name">{item.englishName}</td>
                  <td className="competition-cell--result">
                    {Array.isArray(item.result) ? (
                      <ul className="competition-result-list">
                        {item.result.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      item.result
                    )}
                  </td>
                  <td className="competition-cell--style">{item.style}</td>
                  <td className="competition-cell--date">{item.formattedDate}</td>
                  <td className="competition-cell--year">{item.year}</td>
                  <td className="half-competition-cell--year">{item.halfYear}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="competition-table-empty">
                  沒有符合條件的比賽記錄
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {data.length > 0 && (
        <div className="competition-table-summary">
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

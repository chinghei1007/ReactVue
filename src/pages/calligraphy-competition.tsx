import React, { useState, useMemo, useEffect } from 'react';
import CalligraphyCompetitionTable from '../components/CalligraphyCompetitionTable';
import CalligraphyCompetitionChart from '../components/CalligraphyCompetitionChart';
import CalligraphyCompetitionFilters from '../components/CalligraphyCompetitionFilters';
import type {
  CompetitionTableData,
  SortField,
  SortDirection,
  FilterOptions,
  ChartData
} from '../types/calligraphy-competition';
import competitionData from '../data/calligraphy-competition-data.json';

const CalligraphyCompetitionPage: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection } | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    style: undefined,
    year: undefined,
    halfYear: undefined
  });
  const [viewMode, setViewMode] = useState<'table' | 'chart' | 'both'>('both');
  const [chartType, setChartType] = useState<'year' | 'halfYear'>('year');

  // Parse and prepare the data
  const preparedData: CompetitionTableData[] = useMemo(() => {
    return competitionData
      .filter(item => item.chineseName !== "")
      .map((item, index) => {
        const dateParts = item.resultDate.split('-');
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        
        // Determine half year (H1: Jan-Jun, H2: Jul-Dec)
        const halfYear = month <= 6 ? '上半年' : '下半年';
        
        // Format date as YYYY-MM-DD
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        // Format result for display
        const formattedResult = Array.isArray(item.result) 
          ? item.result.join('; ') 
          : item.result;

        return {
          ...item,
          id: index,
          year,
          halfYear,
          formattedDate,
          formattedResult
        };
      });
  }, []);

  // Apply sorting
  const sortedData: CompetitionTableData[] = useMemo(() => {
    const sortableData = [...preparedData];
    
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue, 'zh-HK') 
            : bValue.localeCompare(aValue, 'zh-HK');
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        }
        
        return 0;
      });
    }
    
    return sortableData;
  }, [preparedData, sortConfig]);

  // Apply filtering
  const filteredData: CompetitionTableData[] = useMemo(() => {
    return sortedData.filter((item) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = [
          item.chineseName,
          item.englishName,
          item.formattedResult,
          item.style,
          item.formattedDate
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Style filter
      if (filters.style && item.style !== filters.style) {
        return false;
      }

      // Year filter
      if (filters.year && item.year !== filters.year) {
        return false;
      }

      // Half year filter
      if (filters.halfYear && item.halfYear !== filters.halfYear) {
        return false;
      }

      return true;
    });
  }, [sortedData, filters]);

  // Extract unique values for filters
  const availableStyles = useMemo(() => {
    return [...new Set(preparedData.map(item => item.style))].sort((a, b) => 
      a.localeCompare(b, 'zh-HK')
    );
  }, [preparedData]);

  const availableYears = useMemo(() => {
    return [...new Set(preparedData.map(item => item.year))].sort((a, b) => b - a);
  }, [preparedData]);

  const availableHalfYears = useMemo(() => {
    return [...new Set(preparedData.map(item => item.halfYear))].sort();
  }, [preparedData]);

  // Prepare chart data
  const chartData: ChartData = useMemo(() => {
    const groupedData = new Map<string, number>();
    
    filteredData.forEach(item => {
      const key = chartType === 'year' 
        ? item.year.toString() 
        : `${item.year} ${item.halfYear}`;
      
      groupedData.set(key, (groupedData.get(key) || 0) + 1);
    });

    const sortedEntries = [...groupedData.entries()].sort(([a], [b]) => {
      if (chartType === 'year') {
        return parseInt(a) - parseInt(b);
      } else {
        // For half year, sort by year first, then by half year
        const [aYear, aHalf] = a.split(' ');
        const [bYear, bHalf] = b.split(' ');
        const yearDiff = parseInt(aYear) - parseInt(bYear);
        if (yearDiff !== 0) return yearDiff;
        return aHalf.localeCompare(bHalf, 'zh-HK');
      }
    });

    const labels = sortedEntries.map(([key]) => key);
    const data = sortedEntries.map(([, count]) => count);

    return {
      labels,
      datasets: [
        {
          label: chartType === 'year' ? '比賽數量 (按年份)' : '比賽數量 (按半年)',
          data,
          borderColor: 'var(--text)',
          backgroundColor: 'var(--text)',
          fill: false
        }
      ]
    };
  }, [filteredData, chartType]);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setSortConfig({ field, direction });
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Reset sort when filters change significantly
  useEffect(() => {
    if (Object.values(filters).some(v => v !== undefined && v !== '')) {
      // Keep current sort
    } else {
      // Reset to default sort by date descending
      setSortConfig({ field: 'formattedDate', direction: 'desc' });
    }
  }, [filters]);

  // Set default sort on initial load
  useEffect(() => {
    if (sortConfig === null) {
      setSortConfig({ field: 'formattedDate', direction: 'desc' });
    }
  }, []);

  return (
    <div className="calligraphy-competition-page">
      <header className="page-header">
        <h1>書法比賽記錄</h1>
        <p className="page-subtitle">個人參加的書法比賽及獲獎記錄</p>
      </header>

      <div className="competition-controls">
        <div className="view-mode-selector">
          <label>顯示模式:</label>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value as 'table' | 'chart' | 'both')}
            className="view-mode-select"
          >
            <option value="both">表格 + 圖表</option>
            <option value="table">僅表格</option>
            <option value="chart">僅圖表</option>
          </select>
        </div>

        {viewMode !== 'table' && (
          <div className="chart-type-selector">
            <label>圖表類型:</label>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value as 'year' | 'halfYear')}
              className="chart-type-select"
            >
              <option value="year">按年份</option>
              <option value="halfYear">按半年</option>
            </select>
          </div>
        )}
      </div>

      <CalligraphyCompetitionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableStyles={availableStyles}
        availableYears={availableYears}
        availableHalfYears={availableHalfYears}
      />

      {viewMode !== 'chart' && (
        <section className="competition-table-section">
          <CalligraphyCompetitionTable
            data={filteredData}
            onSort={handleSort}
            currentSort={sortConfig}
            filters={filters}
          />
        </section>
      )}

      {viewMode !== 'table' && (
        <section className="competition-chart-section">
          <CalligraphyCompetitionChart
            chartData={chartData}
            title={chartType === 'year' ? '書法比賽參加數量 (按年份)' : '書法比賽參加數量 (按半年)'}
            type={chartType}
          />
        </section>
      )}

      <div className="page-footer">
        <p>總計: {preparedData.length} 場比賽 | 顯示: {filteredData.length} 條記錄</p>
      </div>
    </div>
  );
};

export default CalligraphyCompetitionPage;

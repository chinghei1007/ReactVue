import React from 'react';
import type { Chart } from 'chart.js';
import type { ChartData } from '@/types/calligraphy-competition';
import { useTheme } from '@/theme/ThemeContext';

/* eslint-disable react-hooks/immutability -- Chart.js updates its chart instance imperatively. */

interface CalligraphyCompetitionChartProps {
  chartData: ChartData;
  title: string;
  type: 'year' | 'halfYear';
  onTypeChange: (type: 'year' | 'halfYear') => void;
}

const CalligraphyCompetitionChart: React.FC<CalligraphyCompetitionChartProps> = ({
  chartData,
  title,
  type,
  onTypeChange
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const chartRef = React.useRef<Chart<'line'> | null>(null);
  const latestChartDataRef = React.useRef(chartData);
  const latestTitleRef = React.useRef(title);
  const [error, setError] = React.useState<string | null>(null);
  const { theme } = useTheme();

  React.useEffect(() => {
    latestChartDataRef.current = chartData;
    latestTitleRef.current = title;
  }, [chartData, title]);

  React.useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;
    let cancelled = false;

    // Destroy previous chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Import Chart.js dynamically
    const initChart = async () => {
      try {
        const { Chart: ChartJS, registerables } = await import('chart.js');
        ChartJS.register(...registerables);

        // Dynamic imports can finish after cleanup during Strict Mode's effect replay.
        if (cancelled || canvasRef.current !== ctx) return;

        // Defensively release any instance created by an older async effect.
        ChartJS.getChart(ctx)?.destroy();

        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim() || '#e2e8f0';
        const mutedTextColor = getComputedStyle(document.documentElement).getPropertyValue('--color-content-muted').trim() || '#c4cfdf';
        const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#334155';
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-page').trim() || '#020617';

        const initialChartData = latestChartDataRef.current;
        const chart = new ChartJS(ctx, {
          type: 'line',
          data: {
            ...initialChartData,
            datasets: initialChartData.datasets.map(dataset => ({
              ...dataset,
              borderColor: textColor,
              backgroundColor: textColor,
              pointBackgroundColor: textColor,
              pointBorderColor: bgColor,
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }))
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
                labels: {
                  color: textColor,
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: true,
                text: latestTitleRef.current,
                color: textColor,
                font: {
                  size: 16,
                  weight: 'bold' as const
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: borderColor
                },
                ticks: {
                  color: mutedTextColor
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: borderColor
                },
                ticks: {
                  color: mutedTextColor,
                  stepSize: 1
                }
              }
            },
            elements: {
              point: {
                backgroundColor: textColor,
                borderColor: bgColor,
                borderWidth: 2,
                radius: 4,
                hoverRadius: 6
              },
              line: {
                tension: 0.4,
                borderWidth: 2
              }
            }
          }
        });
        chartRef.current = chart;
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError('無法加載圖表庫');
        console.error('Failed to load Chart.js:', err);
      }
    };

    initChart();

    return () => {
      cancelled = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  // Keep the same Chart.js instance so existing points animate to their new
  // horizontal and vertical positions instead of growing again from zero.
  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.labels = [...chartData.labels];

    chartData.datasets.forEach((nextDataset, index) => {
      const currentDataset = chart.data.datasets[index];
      if (!currentDataset) return;

      currentDataset.label = nextDataset.label;
      currentDataset.data = [...nextDataset.data];
      currentDataset.fill = nextDataset.fill;
    });

    const chartTitle = chart.options.plugins?.title;
    if (chartTitle) chartTitle.text = title;

    chart.update();
  }, [chartData, title]);

  // Update chart when theme changes
  React.useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      
      // Update colors based on current theme
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim() || '#e2e8f0';
      const mutedTextColor = getComputedStyle(document.documentElement).getPropertyValue('--color-content-muted').trim() || '#c4cfdf';
      const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#334155';
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-page').trim() || '#020617';

      const legendLabels = chart.options.plugins?.legend?.labels;
      const chartTitle = chart.options.plugins?.title;
      const xScale = chart.options.scales?.x;
      const yScale = chart.options.scales?.y;

      if (legendLabels) legendLabels.color = textColor;
      if (chartTitle) chartTitle.color = textColor;
      if (xScale?.grid) xScale.grid.color = borderColor;
      if (xScale?.ticks) xScale.ticks.color = mutedTextColor;
      if (yScale?.grid) yScale.grid.color = borderColor;
      if (yScale?.ticks) yScale.ticks.color = mutedTextColor;
      
      if (chart.data.datasets[0]) {
        chart.data.datasets[0].borderColor = textColor;
        chart.data.datasets[0].backgroundColor = textColor;
        chart.data.datasets[0].pointBackgroundColor = textColor;
        chart.data.datasets[0].pointBorderColor = bgColor;
      }

      chart.update();
    }
  }, [theme]);

  if (error) {
    return (
      <div className="competition-chart-container">
        <div className="competition-chart-error">
          <p>⚠️ {error}</p>
          <p>圖表功能需要 Chart.js 庫，請確保網路連接正常。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="competition-chart-container">
      <div className="competition-chart-type-options" role="radiogroup" aria-label="圖表類型">
        <label>
          <input
            type="radio"
            name="competition-chart-type"
            value="year"
            checked={type === 'year'}
            onChange={() => onTypeChange('year')}
          />
          按一年
        </label>
        <label>
          <input
            type="radio"
            name="competition-chart-type"
            value="halfYear"
            checked={type === 'halfYear'}
            onChange={() => onTypeChange('halfYear')}
          />
          按半年
        </label>
      </div>
      <div className="competition-chart-wrapper">
        <canvas ref={canvasRef} />
      </div>
      <div className="competition-chart-info">
        <span>比賽數量趨勢圖 ({type === 'year' ? '按年份' : '按半年'})</span>
      </div>
    </div>
  );
};

export default CalligraphyCompetitionChart;

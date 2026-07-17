import React from 'react';
import type { ChartData } from '../types/calligraphy-competition';

interface CalligraphyCompetitionChartProps {
  chartData: ChartData;
  title: string;
  type: 'year' | 'halfYear';
}

const CalligraphyCompetitionChart: React.FC<CalligraphyCompetitionChartProps> = ({
  chartData,
  title,
  type
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const chartRef = React.useRef<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

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

        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e2e8f0';
        const mutedTextColor = getComputedStyle(document.documentElement).getPropertyValue('--muted-text').trim() || '#c4cfdf';
        const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim() || 'rgba(148, 163, 184, 0.25)';
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#020617';

        chartRef.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            ...chartData,
            datasets: chartData.datasets.map(dataset => ({
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
                text: title,
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
        setError(null);
      } catch (err) {
        setError('無法加載圖表庫');
        console.error('Failed to load Chart.js:', err);
      }
    };

    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartData, title]);

  // Update chart when theme changes
  React.useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      
      // Update colors based on current theme
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e2e8f0';
      const mutedTextColor = getComputedStyle(document.documentElement).getPropertyValue('--muted-text').trim() || '#c4cfdf';
      const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim() || 'rgba(148, 163, 184, 0.25)';
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#020617';

      chart.options.plugins.legend.labels.color = textColor;
      chart.options.plugins.title.color = textColor;
      chart.options.scales.x.grid.color = borderColor;
      chart.options.scales.x.ticks.color = mutedTextColor;
      chart.options.scales.y.grid.color = borderColor;
      chart.options.scales.y.ticks.color = mutedTextColor;
      
      if (chart.data.datasets[0]) {
        chart.data.datasets[0].borderColor = textColor;
        chart.data.datasets[0].backgroundColor = textColor;
        chart.data.datasets[0].pointBackgroundColor = textColor;
        chart.data.datasets[0].pointBorderColor = bgColor;
      }

      chart.update();
    }
  }, []);

  if (error) {
    return (
      <div className="competition-chart-container">
        <div className="chart-error">
          <p>⚠️ {error}</p>
          <p>圖表功能需要 Chart.js 庫，請確保網路連接正常。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="competition-chart-container">
      <div className="chart-wrapper">
        <canvas ref={canvasRef} />
      </div>
      <div className="chart-info">
        <span>比賽數量趨勢圖 ({type === 'year' ? '按年份' : '按半年'})</span>
      </div>
    </div>
  );
};

export default CalligraphyCompetitionChart;

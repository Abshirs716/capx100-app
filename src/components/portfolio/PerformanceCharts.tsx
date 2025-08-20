import React, { useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react'

interface PerformanceChartsProps {
  holdings: any[]
  isDarkMode?: boolean
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ holdings, isDarkMode = false }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Performance data
  const performanceData = [
    { month: 'Aug 24', portfolio: 100000, benchmark: 100000 },
    { month: 'Sep 24', portfolio: 105235, benchmark: 102500 },
    { month: 'Oct 24', portfolio: 109876, benchmark: 105800 },
    { month: 'Nov 24', portfolio: 112345, benchmark: 108500 },
    { month: 'Dec 24', portfolio: 114301, benchmark: 110200 },
    { month: 'Jan 25', portfolio: 115500, benchmark: 112800 },
    { month: 'Feb 25', portfolio: 115800, benchmark: 114500 },
    { month: 'Mar 25', portfolio: 116200, benchmark: 115800 },
    { month: 'Apr 25', portfolio: 116800, benchmark: 116500 },
    { month: 'May 25', portfolio: 117900, benchmark: 117200 },
    { month: 'Jun 25', portfolio: 119200, benchmark: 118000 },
    { month: 'Jul 25', portfolio: 128603, benchmark: 121452 }
  ]

  // Top 10 holdings for pie chart
  const topHoldings = holdings
    .sort((a, b) => b.marketValue - a.marketValue)
    .slice(0, 10)
  
  const pieData = topHoldings.map(h => ({
    name: h.symbol,
    value: h.marketValue,
    percentage: ((h.marketValue / holdings.reduce((sum, h) => sum + h.marketValue, 0)) * 100).toFixed(1)
  }))

  // Colors for pie chart
  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#14B8A6', '#F97316', '#06B6D4']

  // Bar chart data
  const sectorData = [
    { sector: 'Technology', value: 45000, percentage: 35 },
    { sector: 'Healthcare', value: 30000, percentage: 23 },
    { sector: 'Finance', value: 25000, percentage: 19 },
    { sector: 'Consumer', value: 20000, percentage: 15 },
    { sector: 'Energy', value: 10000, percentage: 8 }
  ]

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180)
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${percentage}%`}
      </text>
    )
  }

  const chartTextColor = isDarkMode ? '#9CA3AF' : '#4B5563'
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB'

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <PieChartIcon className="mr-2 text-blue-500" />
        Performance Charts
      </h2>

      {/* Line Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">12-Month Performance vs Benchmark</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: chartTextColor, fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: chartTextColor, fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="line"
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            <Line 
              type="monotone" 
              dataKey="portfolio" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Portfolio"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="#10B981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Benchmark"
              dot={{ fill: '#10B981', strokeWidth: 1, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart and Bar Chart Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Top 10 Holdings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke={activeIndex === index ? '#fff' : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend below pie chart */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div 
                  className="w-3 h-3 mr-2 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{entry.name}: {entry.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="sector" 
                tick={{ fill: chartTextColor, fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: chartTextColor, fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#8B5CF6"
                radius={[8, 8, 0, 0]}
              >
                {sectorData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
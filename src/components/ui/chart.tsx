import React, { createContext, useContext } from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { cn } from '@/lib/utils';

// Common chart props
interface BaseChartProps {
  data: any[];
  className?: string;
  showAnimation?: boolean;
  showTooltip?: boolean;
}

// Props for Cartesian charts (Line, Bar, Area)
interface CartesianChartProps extends BaseChartProps {
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGridLines?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  startEndOnly?: boolean;
}

// Props specific to PieChart
interface PieChartProps extends BaseChartProps {
  index: string;
  category: string;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
}

// Chart configuration type
export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// Chart context
interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

// Chart container component
interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  config, 
  children, 
  className,
  id
}) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn("w-full h-full", className)}
        id={id}
        style={
          Object.entries(config).reduce(
            (styles, [key, { color }]) => ({
              ...styles,
              [`--color-${key}`]: color,
            }),
            {}
          )
        }
      >
          {children}
      </div>
    </ChartContext.Provider>
  );
};

// Chart tooltip component
interface ChartTooltipProps {
  cursor?: boolean;
  content?: React.ReactNode;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ 
  cursor = true, 
  content 
}) => {
  return (
    <Tooltip
      cursor={cursor}
      content={content}
      contentStyle={{ 
        borderRadius: '6px', 
        padding: '8px', 
        backgroundColor: '#fff', 
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' 
      }}
    />
  );
};

// Chart tooltip content component
interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any) => string;
  indicator?: 'line' | 'dot';
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
      active,
      payload,
      label,
  formatter = (value) => value.toString(),
  indicator = 'dot',
}) => {
  const chartContext = useContext(ChartContext);
  
  if (!active || !payload || !chartContext) {
    return null;
    }

    return (
    <div className="bg-white p-2 border rounded-md shadow-sm">
      <p className="text-sm font-medium mb-1">{label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const config = chartContext.config[entry.dataKey];
          if (!config) return null;

          return (
            <div key={`tooltip-item-${index}`} className="flex items-center gap-2">
              {indicator === 'line' ? (
                <div 
                  className="w-3 h-0.5" 
                  style={{ backgroundColor: config.color }}
                />
              ) : (
                <div
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: config.color }}
                />
              )}
              <span className="text-xs text-gray-600">{config.label}:</span>
              <span className="text-xs font-medium">{formatter(entry.value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// LineChart Component
export const LineChart: React.FC<CartesianChartProps> = ({
  data,
  index,
  categories,
  colors = ['#2563eb', '#4ade80', '#f59e0b', '#ef4444'],
  valueFormatter = (value) => value.toString(),
  showLegend = true,
  showGridLines = true,
  showAnimation = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  startEndOnly = false,
  className,
}) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showXAxis && (
            <XAxis 
              dataKey={index} 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
              tickFormatter={startEndOnly ? (value, index) => {
                if (index === 0 || index === data.length - 1) {
                  return value;
                }
                return '';
              } : undefined}
            />
          )}
          {showYAxis && (
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
              tickFormatter={(value) => valueFormatter(value)}
            />
          )}
          {showTooltip && (
            <Tooltip 
              formatter={(value: number) => valueFormatter(value)}
              contentStyle={{ 
                borderRadius: '6px', 
                padding: '8px', 
                backgroundColor: '#fff', 
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
          )}
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              isAnimationActive={showAnimation}
              animationDuration={1000}
              strokeDasharray={data.some((item) => item.projected && item[category]) ? "5 5" : undefined}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// BarChart Component
export const BarChart: React.FC<CartesianChartProps> = ({
  data,
  index,
  categories,
  colors = ['#2563eb', '#94a3b8', '#f59e0b', '#ef4444'],
  valueFormatter = (value) => value.toString(),
  showLegend = true,
  showGridLines = true,
  showAnimation = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  className,
}) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showXAxis && (
            <XAxis 
              dataKey={index} 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
            />
          )}
          {showYAxis && (
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
              tickFormatter={(value) => valueFormatter(value)}
            />
          )}
          {showTooltip && (
            <Tooltip 
              formatter={(value: number) => valueFormatter(value)}
              contentStyle={{ 
                borderRadius: '6px', 
                padding: '8px', 
                backgroundColor: '#fff', 
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
          )}
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              isAnimationActive={showAnimation}
              animationDuration={1000}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// PieChart Component
export const PieChart: React.FC<PieChartProps> = ({
  data,
  index,
  category,
  valueFormatter = (value) => value.toString(),
  showLegend = true,
  showAnimation = true,
  showTooltip = true,
  className,
}) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            dataKey={category}
            nameKey={index}
            isAnimationActive={showAnimation}
            animationDuration={1000}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip 
              formatter={(value: number) => valueFormatter(value)}
              contentStyle={{ 
                borderRadius: '6px', 
                padding: '8px', 
                backgroundColor: '#fff', 
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
          )}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

// AreaChart Component
export const AreaChart: React.FC<CartesianChartProps> = ({
  data,
  index,
  categories,
  colors = ['#2563eb', '#4ade80', '#f59e0b', '#ef4444'],
  valueFormatter = (value) => value.toString(),
  showLegend = true,
  showGridLines = true,
  showAnimation = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  className,
}) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showXAxis && (
            <XAxis 
              dataKey={index} 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
            />
          )}
          {showYAxis && (
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
              tickFormatter={(value) => valueFormatter(value)}
            />
          )}
          {showTooltip && (
            <Tooltip 
              formatter={(value: number) => valueFormatter(value)}
              contentStyle={{ 
                borderRadius: '6px', 
                padding: '8px', 
                backgroundColor: '#fff', 
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
          )}
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              fill={`${colors[i % colors.length]}33`}
              isAnimationActive={showAnimation}
              animationDuration={1000}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

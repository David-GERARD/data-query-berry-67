/**
 * Component for rendering data visualizations using Recharts.
 * Displays bar charts with customizable axes, labels, and tooltips.
 */
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from "@/components/ui/card";

interface VisualizationResultProps {
  data: any[];
  title: string;
  xLabel: string;
  yLabel: string;
}

const VisualizationResult = ({ data, title, xLabel, yLabel }: VisualizationResultProps) => {
  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              label={{ value: xLabel, position: 'bottom', offset: 0 }}
            />
            <YAxis
              label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0EA5E9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default VisualizationResult;
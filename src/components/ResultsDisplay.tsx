import { Card } from "@/components/ui/card";
import LoadingSpinner from "./LoadingSpinner";
import StatisticalResult from "./StatisticalResult";
import VisualizationResult from "./VisualizationResult";

interface ResultsDisplayProps {
  loading: boolean;
  error?: string;
  type: 'visualization' | 'statistical';
  data?: any;
}

const ResultsDisplay = ({ loading, error, type, data }: ResultsDisplayProps) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="animate-fade-in">
      {type === 'visualization' ? (
        <VisualizationResult {...data} />
      ) : (
        <StatisticalResult result={data} />
      )}
    </div>
  );
};

export default ResultsDisplay;
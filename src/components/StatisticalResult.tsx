import { Card } from "@/components/ui/card";

interface StatisticalResultProps {
  result: {
    pValue: number;
    effectSize: number;
    confidence: [number, number];
    interpretation: string;
  };
}

const StatisticalResult = ({ result }: StatisticalResultProps) => {
  const getSignificanceColor = (pValue: number) => {
    if (pValue < 0.01) return "text-green-600";
    if (pValue < 0.05) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Statistical Analysis Results</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">P-Value</p>
          <p className={`text-lg font-medium ${getSignificanceColor(result.pValue)}`}>
            {result.pValue.toFixed(4)}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Effect Size</p>
          <p className="text-lg font-medium">{result.effectSize.toFixed(2)}</p>
        </div>
        <div className="col-span-2 space-y-2">
          <p className="text-sm text-gray-500">95% Confidence Interval</p>
          <p className="text-lg font-medium">
            [{result.confidence[0].toFixed(2)}, {result.confidence[1].toFixed(2)}]
          </p>
        </div>
        <div className="col-span-2 mt-4">
          <p className="text-sm text-gray-500">Interpretation</p>
          <p className="mt-2 text-medical-dark">{result.interpretation}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatisticalResult;
import { useState } from 'react';
import QueryInput from '../components/QueryInput';
import QueryHistory from '../components/QueryHistory';
import ResultsDisplay from '../components/ResultsDisplay';
import { useToast } from "@/components/ui/use-toast";

interface QueryHistoryItem {
  id: string;
  query: string;
  type: 'visualization' | 'statistical';
  timestamp: Date;
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [currentType, setCurrentType] = useState<'visualization' | 'statistical'>('visualization');
  const [result, setResult] = useState<any>();
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);
  const { toast } = useToast();

  const handleQuerySubmit = async (query: string, type: 'visualization' | 'statistical') => {
    setLoading(true);
    setError(undefined);
    setCurrentType(type);

    try {
      // Mock API call - replace with your actual backend call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockData = type === 'visualization' 
        ? {
            title: "Treatment Outcomes Analysis",
            xLabel: "Treatment Type",
            yLabel: "Patient Count",
            data: [
              { name: "Treatment A", value: 30 },
              { name: "Treatment B", value: 45 },
              { name: "Treatment C", value: 25 },
            ]
          }
        : {
            pValue: 0.032,
            effectSize: 0.45,
            confidence: [0.21, 0.69],
            interpretation: "There is a significant positive association between Treatment A and Outcome B (p < 0.05)"
          };

      setResult(mockData);
      
      // Add to history
      setQueryHistory(prev => [{
        id: Date.now().toString(),
        query,
        type,
        timestamp: new Date()
      }, ...prev]);

      toast({
        title: "Analysis Complete",
        description: "Your query has been processed successfully.",
      });
    } catch (err) {
      setError("Failed to process query. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process query. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: QueryHistoryItem) => {
    handleQuerySubmit(item.query, item.type);
  };

  return (
    <div className="min-h-screen bg-medical-light">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-medical-dark mb-8">
          EHR Data Analysis Dashboard
        </h1>
        
        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div className="space-y-6">
            <QueryInput onSubmit={handleQuerySubmit} />
            <ResultsDisplay
              loading={loading}
              error={error}
              type={currentType}
              data={result}
            />
          </div>
          
          <QueryHistory
            queries={queryHistory}
            onSelect={handleHistorySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
/**
 * Main page component that integrates file upload, query input, and results display.
 * Manages the overall layout and state of the EHR data analysis dashboard.
 */
import { useState } from 'react';
import QueryInput from '../components/QueryInput';
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import { Card } from "@/components/ui/card";

interface QueryResult {
  text?: string;
  image?: boolean;
}

const Index = () => {
  const [result, setResult] = useState<QueryResult | null>(null);

  const handleQueryResult = (data: QueryResult) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="container mx-auto py-16 px-4 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-medical-blue via-medical-accent to-indigo-600 animate-fade-in">
            EHR Data Analysis Dashboard
          </h1>
          <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto animate-fade-in">
            Upload your EHR data and gain valuable insights through intelligent analysis
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <FileUpload />
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <Card className="p-8 shadow-xl bg-white/90 backdrop-blur-xl rounded-2xl border-0">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 bg-clip-text">Query Results</h2>
                {result ? (
                  <ResultsDisplay
                    text={result.text}
                    image={result.image}
                  />
                ) : (
                  <p className="text-gray-500 text-center py-12 italic">
                    No queries have been made yet. Use the form to ask questions about your EHR data.
                  </p>
                )}
              </Card>
            </div>

            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <QueryInput onSubmit={handleQueryResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
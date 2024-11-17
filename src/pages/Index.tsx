import { useState } from 'react';
import QueryInput from '../components/QueryInput';
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#f6f3f0] to-[#e2d1c3]">
      <div className="container mx-auto py-20 px-4 max-w-7xl">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8 text-medical-blue animate-pulse" />
            <h1 className="text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-medical-blue via-medical-accent to-indigo-600">
              EHR Insights
            </h1>
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
          <p className="text-slate-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Transform your healthcare data into meaningful insights with our elegant analysis platform
          </p>
        </div>
        
        <div className="space-y-16">
          <div className="transform hover:scale-[1.01] transition-all duration-500 ease-out">
            <FileUpload />
          </div>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="group transform hover:scale-[1.01] transition-all duration-500 ease-out">
              <Card className="backdrop-blur-xl bg-white/80 rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-light mb-6 text-gray-800 tracking-wide group-hover:text-medical-blue transition-colors duration-300">
                    Analysis Results
                  </h2>
                  <div className="relative">
                    {result ? (
                      <ResultsDisplay
                        text={result.text}
                        image={result.image}
                      />
                    ) : (
                      <div className="text-center py-20 px-6">
                        <p className="text-gray-400 text-lg font-light italic">
                          Your analysis results will appear here
                        </p>
                        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-medical-blue/20 via-medical-accent/20 to-indigo-600/20 mx-auto rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="transform hover:scale-[1.01] transition-all duration-500 ease-out">
              <QueryInput onSubmit={handleQueryResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
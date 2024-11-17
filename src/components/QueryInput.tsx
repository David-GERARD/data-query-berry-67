import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { SendHorizontal, Sparkles } from "lucide-react";

interface QueryInputProps {
  onSubmit: (data: { text?: string; image?: boolean }) => void;
}

const QueryInput = ({ onSubmit }: QueryInputProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: query.trim()
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { text: responseText };
      }

      if (typeof data.text === 'string' && data.text.startsWith('{')) {
        try {
          const parsedText = JSON.parse(data.text);
          data.text = parsedText.text || parsedText.output || data.text;
        } catch (e) {
          console.log('Failed to parse nested JSON');
        }
      }

      onSubmit({
        text: data.text || data.output || 'No response text available',
        image: data.image || false
      });

      setQuery('');
      
      toast({
        title: "Analysis Complete",
        description: "Your results are ready to view",
        className: "bg-gradient-to-r from-medical-blue/90 to-medical-accent/90 text-white border-none",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process query. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/80 rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="space-y-8 p-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-gray-800 tracking-wide group-hover:text-medical-blue transition-colors duration-300">
              Ask a Question
            </h2>
            <Sparkles className="w-5 h-5 text-medical-accent/70" />
          </div>
          <Textarea
            placeholder="What insights would you like to discover?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[180px] resize-none rounded-2xl border-medical-blue/5 focus:border-medical-blue/20 bg-white/40 text-base placeholder:text-gray-400 transition-all duration-300 focus:shadow-inner p-6"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-medical-blue via-medical-accent to-indigo-600 hover:opacity-90 transition-all duration-500 shadow-md hover:shadow-lg text-base py-7 rounded-2xl group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Analyze Data
                <SendHorizontal className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-medical-accent to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        </Button>
      </div>
    </Card>
  );
};

export default QueryInput;
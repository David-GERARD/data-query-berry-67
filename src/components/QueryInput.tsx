import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface QueryInputProps {
  onSubmit: (data: { text?: string; visualization?: any }) => void;
}

const QueryInput = ({ onSubmit }: QueryInputProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://ef-hackathon.onrender.com/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) throw new Error('Query failed');

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
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
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Textarea
          placeholder="Ask a question about your EHR data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Ask Question"}
      </Button>
    </div>
  );
};

export default QueryInput;
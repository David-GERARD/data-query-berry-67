import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QueryInputProps {
  onSubmit: (query: string, type: 'visualization' | 'statistical') => void;
}

const QueryInput = ({ onSubmit }: QueryInputProps) => {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState<'visualization' | 'statistical'>('visualization');

  const handleSubmit = () => {
    if (query.trim()) {
      onSubmit(query, queryType);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="query">Enter your query in natural language</Label>
        <Textarea
          id="query"
          placeholder="e.g., Show me the correlation between treatment A and outcome B"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>
      
      <RadioGroup
        value={queryType}
        onValueChange={(value) => setQueryType(value as 'visualization' | 'statistical')}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="visualization" id="visualization" />
          <Label htmlFor="visualization">Visualization</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="statistical" id="statistical" />
          <Label htmlFor="statistical">Statistical Analysis</Label>
        </div>
      </RadioGroup>

      <Button 
        onClick={handleSubmit}
        className="w-full bg-medical-blue hover:bg-medical-blue/90 text-white"
      >
        Analyze Data
      </Button>
    </div>
  );
};

export default QueryInput;
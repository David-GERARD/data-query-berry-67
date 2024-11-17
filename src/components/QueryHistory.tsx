/**
 * Component that displays a scrollable list of previous queries with their metadata.
 * Allows users to select and rerun previous queries.
 */
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface QueryHistoryItem {
  id: string;
  query: string;
  type: 'visualization' | 'statistical';
  timestamp: Date;
}

interface QueryHistoryProps {
  queries: QueryHistoryItem[];
  onSelect: (query: QueryHistoryItem) => void;
}

const QueryHistory = ({ queries, onSelect }: QueryHistoryProps) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4 text-medical-dark">Query History</h2>
      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {queries.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start text-left text-sm p-2 hover:bg-medical-light"
              onClick={() => onSelect(item)}
            >
              <div>
                <p className="font-medium truncate">{item.query}</p>
                <p className="text-xs text-gray-500">
                  {item.type} • {item.timestamp.toLocaleDateString()}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QueryHistory;
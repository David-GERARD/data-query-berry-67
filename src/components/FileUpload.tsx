import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload, FileWarning } from "lucide-react";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesCount, setFilesCount] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);
    setFilesCount(files.length);
    
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("https://ef-hackathon.onrender.com/upload", {
        method: "POST",
        body: formData,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) throw new Error("Upload failed");

      toast({
        title: "Success!",
        description: `Successfully uploaded ${files.length} files`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload files. Please try again.",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg">
        <Upload className="h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-4">Upload your EHR files (PDF format)</p>
        <Button asChild variant="secondary">
          <label className="cursor-pointer">
            Choose Files
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </Button>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 text-center">
            Uploading {filesCount} files...
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';
import { UploadProgress } from '@/hooks/useFileUpload';

interface FileUploadProgressProps {
  uploads: UploadProgress[];
}

const FileUploadProgress = ({ uploads }: FileUploadProgressProps) => {
  if (uploads.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      {uploads.map((upload, index) => (
        <div key={index} className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium truncate flex-1">
              {upload.fileName}
            </span>
            {upload.status === 'complete' && (
              <CheckCircle className="w-4 h-4 text-success ml-2" />
            )}
            {upload.status === 'error' && (
              <XCircle className="w-4 h-4 text-destructive ml-2" />
            )}
          </div>
          {upload.status === 'uploading' && (
            <Progress value={upload.progress} className="h-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileUploadProgress;

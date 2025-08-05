import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit3 } from "lucide-react";

interface EmailEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const EmailEditor = ({ content, onChange }: EmailEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);

  const formatEmailContent = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className="mb-2">
        {line || <br />}
      </div>
    ));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Email Content</label>
        <div className="flex gap-2">
          <Button
            variant={isPreview ? "outline" : "default"}
            size="sm"
            onClick={() => setIsPreview(false)}
            className="h-8 px-3"
          >
            <Edit3 className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={isPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setIsPreview(true)}
            className="h-8 px-3"
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
        </div>
      </div>
      
      {isPreview ? (
        <Card className="p-4 bg-secondary/30 border-border/50 min-h-[200px]">
          <div className="prose prose-sm max-w-none text-foreground">
            {formatEmailContent(content)}
          </div>
        </Card>
      ) : (
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          className="bg-secondary/30 border-border/50 focus:border-primary resize-none font-mono text-sm"
          placeholder="Your generated email will appear here..."
        />
      )}
    </div>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Sparkles, Send, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { EmailEditor } from "./EmailEditor";

interface EmailComposerProps {
  onGenerateEmail: (prompt: string, recipients: string[]) => Promise<string>;
  onSendEmail: (recipients: string[], subject: string, content: string) => Promise<void>;
}

export const EmailComposer = ({ onGenerateEmail, onSendEmail }: EmailComposerProps) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const addRecipient = () => {
    if (currentRecipient && !recipients.includes(currentRecipient)) {
      if (isValidEmail(currentRecipient)) {
        setRecipients([...recipients, currentRecipient]);
        setCurrentRecipient("");
      } else {
        toast.error("Please enter a valid email address");
      }
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGenerateEmail = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for the email");
      return;
    }
    if (recipients.length === 0) {
      toast.error("Please add at least one recipient");
      return;
    }

    setIsGenerating(true);
    try {
      const generated = await onGenerateEmail(prompt, recipients);
      setGeneratedEmail(generated);
      toast.success("Email generated successfully!");
    } catch (error) {
      toast.error("Failed to generate email. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!generatedEmail.trim()) {
      toast.error("Please generate an email first");
      return;
    }
    if (!emailSubject.trim()) {
      toast.error("Please enter an email subject");
      return;
    }

    setIsSending(true);
    try {
      await onSendEmail(recipients, emailSubject, generatedEmail);
      toast.success(`Email sent successfully to ${recipients.length} recipient(s)!`);
      // Reset form
      setRecipients([]);
      setPrompt("");
      setGeneratedEmail("");
      setEmailSubject("");
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-card border-border/50 shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl bg-gradient-primary bg-clip-text text-transparent">
            <Mail className="h-6 w-6 text-primary" />
            AI Email Composer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipients Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Recipients</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address..."
                value={currentRecipient}
                onChange={(e) => setCurrentRecipient(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addRecipient()}
                className="bg-secondary/30 border-border/50 focus:border-primary"
              />
              <Button 
                onClick={addRecipient} 
                variant="glow"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipients.map((email) => (
                <Badge 
                  key={email} 
                  variant="secondary"
                  className="bg-primary/10 text-primary-foreground border-primary/20 gap-1"
                >
                  {email}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeRecipient(email)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Prompt Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Email Prompt</label>
            <Textarea
              placeholder="Describe the email you want to generate (e.g., 'Write a professional follow-up email for our meeting yesterday about the new project proposal...')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="bg-secondary/30 border-border/50 focus:border-primary resize-none"
            />
          </div>

          <Button 
            onClick={handleGenerateEmail}
            disabled={isGenerating || !prompt.trim() || recipients.length === 0}
            variant="gradient"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Email...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Email Section */}
      {generatedEmail && (
        <Card className="bg-gradient-card border-border/50 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Generated Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input
                placeholder="Enter email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="bg-secondary/30 border-border/50 focus:border-primary"
              />
            </div>
            
            <EmailEditor 
              content={generatedEmail}
              onChange={setGeneratedEmail}
            />

            <Button 
              onClick={handleSendEmail}
              disabled={isSending || !emailSubject.trim()}
              variant="gradient"
              className="w-full"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending Email...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Email ({recipients.length} recipient{recipients.length !== 1 ? 's' : ''})
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
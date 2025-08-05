import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";
import { EmailComposer } from "@/components/EmailComposer";
import { AIService } from "@/services/aiService";
import { EmailService } from "@/services/emailService";
import { toast } from "sonner";
import heroImage from "@/assets/hero-email.jpg";

const Index = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [aiService, setAiService] = useState<AIService | null>(null);
  const [emailService, setEmailService] = useState<EmailService | null>(null);

  useEffect(() => {
    // ✅ Always use API key from .env (no manual config)
    const envGroqKey = import.meta.env.VITE_GROQ_API_KEY;

    if (envGroqKey) {
      setAiService(new AIService({ apiKey: envGroqKey }));
      setEmailService(new EmailService());
      setIsConfigured(true);
    } else {
      toast.error("Missing API key in .env file");
    }
  }, []);

  const handleGenerateEmail = async (prompt: string, recipients: string[]): Promise<string> => {
    if (!aiService) throw new Error("AI service not configured");
    return await aiService.generateEmail(prompt, recipients);
  };

  const handleSendEmail = async (recipients: string[], subject: string, content: string): Promise<void> => {
    if (!emailService) throw new Error("Email service not configured");
    await emailService.sendEmail(recipients, subject, content);
    toast.success("Email sent successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Email Sender
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isConfigured ? (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="AI Email Generation"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                  AI Email Sender
                </h1>
                <p className="text-lg text-foreground/90">
                  Please set your API key in the .env file to enable email generation
                </p>
              </div>
            </div>

            <Card className="bg-gradient-card border-border/50 shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Transform your email writing with AI-powered generation and automated sending.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="font-medium text-primary mb-2">1. Add Recipients</div>
                    <div className="text-muted-foreground">Enter email addresses for your recipients</div>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="font-medium text-primary mb-2">2. AI Generation</div>
                    <div className="text-muted-foreground">Describe your email and let AI write it</div>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="font-medium text-primary mb-2">3. Send Email</div>
                    <div className="text-muted-foreground">Review, edit, and send to all recipients</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <EmailComposer
            onGenerateEmail={handleGenerateEmail}
            onSendEmail={handleSendEmail}
          />
        )}
      </main>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, ExternalLink, Info } from "lucide-react";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (groqApiKey: string, emailConfig: any) => void;
}

export const ApiKeyDialog = ({ open, onOpenChange, onSave }: ApiKeyDialogProps) => {
  const [groqApiKey, setGroqApiKey] = useState("");
  const [emailConfig, setEmailConfig] = useState({
    fromEmail: "",
    fromName: "",
    serviceKey: ""
  });

  const handleSave = () => {
    if (!groqApiKey.trim()) {
      alert("Please enter your Groq API key");
      return;
    }
    if (!emailConfig.fromEmail.trim()) {
      alert("Please enter your email address");
      return;
    }
    
    onSave(groqApiKey, emailConfig);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            API Configuration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Groq API Configuration */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Groq AI Configuration
                <a 
                  href="https://console.groq.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-glow"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  Get your free API key from{" "}
                  <a 
                    href="https://console.groq.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Groq Console
                  </a>
                  . Groq offers fast, free AI inference.
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groq-key">Groq API Key</Label>
                <Input
                  id="groq-key"
                  type="password"
                  placeholder="gsk_..."
                  value={groqApiKey}
                  onChange={(e) => setGroqApiKey(e.target.value)}
                  className="bg-secondary/30 border-border/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Configuration */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  For demo purposes, emails will be simulated. In production, integrate with SendGrid, Mailgun, or similar services.
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    placeholder="your@email.com"
                    value={emailConfig.fromEmail}
                    onChange={(e) => setEmailConfig({...emailConfig, fromEmail: e.target.value})}
                    className="bg-secondary/30 border-border/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from-name">From Name (Optional)</Label>
                  <Input
                    id="from-name"
                    placeholder="Your Name"
                    value={emailConfig.fromName}
                    onChange={(e) => setEmailConfig({...emailConfig, fromName: e.target.value})}
                    className="bg-secondary/30 border-border/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSave}
            variant="gradient"
            className="w-full"
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
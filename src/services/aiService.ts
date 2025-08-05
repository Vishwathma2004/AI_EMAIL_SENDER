export interface AIServiceConfig {
  apiKey: string;
  model?: string;
}

export class AIService {
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(config?: AIServiceConfig) {
  this.apiKey = config?.apiKey || import.meta.env.VITE_GROQ_API_KEY;
  this.model = config?.model || 'llama3-8b-8192';
}


  async generateEmail(prompt: string, recipients: string[]): Promise<string> {
    const systemPrompt = `You are a professional email writing assistant. Generate a well-structured, professional email based on the user's prompt. The email should be:
    - Professional and appropriate in tone
    - Clear and concise
    - Well-formatted with proper paragraphs
    - Include a natural greeting and closing
    - Ready to send without requiring a subject line (that will be added separately)
    
    Recipients: ${recipients.join(', ')}`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content.trim();
      } else {
        throw new Error('Invalid response from AI service');
      }
    } catch (error) {
      console.error('Error generating email:', error);
      throw new Error('Failed to generate email. Please check your API key and try again.');
    }
  }
}
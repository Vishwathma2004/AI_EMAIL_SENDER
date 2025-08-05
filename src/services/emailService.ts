export interface EmailServiceConfig {
  apiBaseUrl?: string; // Backend API URL
}

export class EmailService {
  private apiBaseUrl: string;

  constructor(config?: EmailServiceConfig) {
    // Use environment variable if provided, fallback to localhost
    this.apiBaseUrl =
      config?.apiBaseUrl ||
      import.meta.env.VITE_EMAIL_API_BASE_URL ||
      "http://localhost:5000";
  }

  async sendEmail(
    recipients: string[],
    subject: string,
    content: string
  ): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients,
          subject,
          content,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
      }

      console.log(`✅ Email successfully sent to ${recipients.join(", ")}`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw new Error("Email sending failed. Please try again later.");
    }
  }
}

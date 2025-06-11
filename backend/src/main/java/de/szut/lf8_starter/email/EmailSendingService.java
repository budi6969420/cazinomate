package de.szut.lf8_starter.email;

import de.szut.lf8_starter.user.User;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.resource.Emailv31;

public abstract class EmailSendingService {
    private final String emailAddress;
    private final String companyName;
    private final IEmailFormattingService emailFormattingService;
    private final MailjetClient client;

    public EmailSendingService(
            String emailAddress,
            String companyName,
            String apiKey,
            String apiSecret,
            IEmailFormattingService emailFormattingService) {
        this.emailAddress = emailAddress;
        this.companyName = companyName;
        this.emailFormattingService = emailFormattingService;
        this.client = new MailjetClient(apiKey, apiSecret);
    }

    public void sendEmail(Object emailContent, User recipient, String subject) throws Exception {
        var htmlContent = emailFormattingService.format(emailContent, recipient.getUsername());

        var request = new MailjetRequest(Emailv31.resource)
                .property(Emailv31.MESSAGES, new JSONArray()
                        .put(new JSONObject()
                                .put(Emailv31.Message.FROM, new JSONObject()
                                        .put("Email", emailAddress)
                                        .put("Name", companyName))
                                .put(Emailv31.Message.TO, new JSONArray()
                                        .put(new JSONObject()
                                                .put("Email", recipient.getEmail())
                                                .put("Name", recipient.getUsername())))
                                .put(Emailv31.Message.SUBJECT, subject)
                                .put(Emailv31.Message.HTMLPART, htmlContent)
                        )
                );

        try {
            this.client.post(request);
        }
        catch (Exception _) {
        }

    }
}

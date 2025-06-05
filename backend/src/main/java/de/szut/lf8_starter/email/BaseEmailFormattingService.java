package de.szut.lf8_starter.email;

public abstract class BaseEmailFormattingService<T> implements IEmailFormattingService {

    private final Class<T> type;

    protected BaseEmailFormattingService(Class<T> type) {
        this.type = type;
    }

    @Override
    public String format(Object emailContent, String username) {
        if (!type.isInstance(emailContent)) {
            throw new IllegalArgumentException("Email content must be of type " + type.getSimpleName());
        }

        var sb = new StringBuilder();

        sb.append("<html><head><style>");
        sb.append("* { margin: 0; padding: 0; font-size: 16px; }");
        sb.append("</style></head><body style='background-color: #272727; color: white; font-family: Segoe UI, sans-serif; padding: 20px;'>");

        sb.append("<div style='background-color: #313131; border-radius: 12px; padding: 25px; max-width: 600px; margin: auto; box-shadow: 0 0 15px rgba(0,0,0,0.5);'>");

        sb.append(String.format(
                "<h1 style='font-size: 25px; color: #16B858; text-align: center; margin-bottom: 15px;'>🎰 Moin %s!</h1>",
                username
        ));

        sb.append("<div style='margin-top: 15px;'>")
                .append(getInnerHtml(emailContent))
                .append("</div>");

        sb.append("<div style='text-align: center; font-size: 13px; color: #c5c5c5; margin-top: 25px;'>")
                .append("Das ist eine automatisierte Nachricht von <a href='https://cazinomate.de' style='color: #16B858; text-decoration: none;'>CazinoMate</a>. Viel Glück und spiele mit Verantwortung!")
                .append("</div>");

        sb.append("</div>");
        sb.append("</body></html>");

        return sb.toString();
    }

    protected abstract String getInnerHtml(Object emailContent);
}

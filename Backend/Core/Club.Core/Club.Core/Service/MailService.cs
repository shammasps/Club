using Club.Core.DTOs;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;


namespace Club.Core.Service
{
    public class MailService
    {

    //    private readonly MailSettings _mail;

    //    public MailService(
    //        IOptions<MailSettings> mail)
    //    {
    //        _mail = mail.Value;
    //    }

    //    public async Task SendPredictionReportAsync(
    //        string toEmail,
    //        string subject,
    //        string body,
    //        string attachmentPath)
    //    {
    //        var email = new MimeMessage();

    //        email.From.Add(
    //            new MailboxAddress(
    //                _mail.DisplayName,
    //                _mail.From));

    //        email.To.Add(
    //            MailboxAddress.Parse(toEmail));

    //        email.Subject = subject;

    //        var builder = new BodyBuilder();

    //        builder.HtmlBody = body;

    //        if (!string.IsNullOrWhiteSpace(attachmentPath)
    //            && File.Exists(attachmentPath))
    //        {
    //            builder.Attachments.Add(attachmentPath);
    //        }

    //        email.Body = builder.ToMessageBody();

    //        using var smtp = new SmtpClient();

    //        //await smtp.ConnectAsync(
    //        //    _mail.Host,
    //        //    _mail.Port,
    //        //    SecureSocketOptions.StartTls);

    //        await smtp.ConnectAsync(
    //_mail.Host,
    //_mail.Port,
    //_mail.UseSSL
    //    ? SecureSocketOptions.SslOnConnect
    //    : SecureSocketOptions.StartTls);

    //        await smtp.AuthenticateAsync(
    //            _mail.UserName,
    //            _mail.Password);

    //        await smtp.SendAsync(email);

    //        await smtp.DisconnectAsync(true);
    //    }
    }
}

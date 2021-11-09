    String email = "example@example.com"
    String password = "password"
    String host = "smtp.office365.com" // e.g. -> "smtp.google.com"
    String port = "587" // e.g. -> "465" "587"

    // Set up properties.
    Properties props = System.getProperties()
    props.put("mail.smtp.user", email)
    props.put("mail.smtp.host", host)
    props.put("mail.smtp.port", port)
    props.put("mail.smtp.starttls.enable","true")
    props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory")
    props.put("mail.smtp.ssl.trust", host) // Change host to "*" if you want to trust all host.

    // Set up message.
    MimeMessage message = new MimeMessage(Session.getDefaultInstance(props))
    message.setFrom(new InternetAddress(email))
    message.addRecipients(Message.RecipientType.TO, new InternetAddress(email))
    message.setSubject(subject)
    message.setContent(content, 'text/plain')

    try {
        // Send mail.
        Transport.send(message, email, password)
    } catch (MessagingException e) {
        e.printStackTrace()
    }
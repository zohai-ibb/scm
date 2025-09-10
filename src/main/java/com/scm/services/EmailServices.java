package com.scm.services;

public interface EmailServices {

    void sendEmailWithAttachment();
    void sendEmail(String to, String subject, String body);
    void sendEmailWithHtml();


}

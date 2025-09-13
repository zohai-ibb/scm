package com.scm.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.entities.Contact;
import com.scm.entities.User;
import com.scm.helpers.Helper;
import com.scm.services.ContactService;
import com.scm.services.UserService;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RestController
@RequestMapping("/user/contacts/contact-cards")
public class ContactCardController {

    @Autowired
    private UserService userService;

    @Autowired
    private ContactService contactService;

    private static final Logger logger = LoggerFactory.getLogger(ContactCardController.class);

    @GetMapping
    public ResponseEntity<byte[]> addLoggedInUserInformation(Authentication authentication) {
        try {
            String username = Helper.getEmailOfLoggedInUser(authentication);
            User user = userService.getUserByEmail(username);
            logger.info("User fetched: {}", user);

            List<Contact> contactList = contactService.getByUserId(user.getUserId());
            logger.info("Contacts found: {}", contactList.size());

            // Load jrxml
            var inputStream = new ClassPathResource("reports/ContactCard.jrxml").getInputStream();

            // Compile jrxml
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

            // Data source
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(contactList);

            // Fill report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, dataSource);

            // Export to PDF bytes
            byte[] pdfBytes = JasperExportManager.exportReportToPdf(jasperPrint);

            // Return as HTTP response
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            logger.error("Error generating contact card report", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{contactId}")
    public ResponseEntity<byte[]> generateSingleContactCard(
            @PathVariable String contactId,
            Authentication authentication) {
        try {
            String username = Helper.getEmailOfLoggedInUser(authentication);
            User user = userService.getUserByEmail(username);

            Contact contact = contactService.getByIdAndUserId(contactId, user.getUserId());
            if (contact == null) {
                return ResponseEntity.notFound().build();
            }

            // Load jrxml
            var inputStream = new ClassPathResource("reports/ContactCard.jrxml").getInputStream();

            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(List.of(contact));

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, dataSource);

            byte[] pdfBytes = JasperExportManager.exportReportToPdf(jasperPrint);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            logger.error("Error generating single contact card", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}

//package com.usyd.emailservice.controller;
//
//import com.usyd.emailservice.model.Email;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
///**
// * REST controller for handling email-related requests.
// * This controller provides an endpoint to send email notifications
// * based on the order status.
// */
//@RestController
//@RequestMapping("/api/email")
//public class EmailController {
//
//    @Autowired
//    private EmailService emailService;
//
//    /**
//     * Handles the POST request to send an email notification.
//     * Expects an Email object in the request body with valid sender, receiver, and status fields.
//     *
//     * @param email The Email object containing sender, receiver, and order status information.
//     * @return A response message indicating whether the email was successfully sent or if there was an error.
//     */
//    @PostMapping("/send")
//    public String sendEmail(@RequestBody Email email) {
//        // Validate the incoming request
//        if (email.getSender() == null || email.getReceiver() == null || email.getStatus() == null) {
//            return "Error: Sender, receiver, and status are required!";
//        }
//
//        // Invoke the EmailService to send the email notification
//        emailService.sendEmail(email);
//
//        // Return a confirmation response
//        return "Email sent to: " + email.getReceiver() + " with order status: " + email.getStatus();
//    }
//}

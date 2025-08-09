//package com.usyd.emailservice.service;
//
//import com.usyd.emailservice.model.Email;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class EmailService {
//
//    // Store the template of email
//    private final Map<String, String[]> emailTemplates = new HashMap<>();
//
//    // Construct
//    public EmailService() {
//        // Initialize email templates for the new statuses
//        emailTemplates.put("CREATED", new String[]{"Order Created", "Your order has been successfully created. We will notify you once it is processed."});
//        emailTemplates.put("PAID", new String[]{"Order Paid", "Your payment has been received. We are now processing your order."});
//        emailTemplates.put("REQUEST_RECEIVED", new String[]{"Order Processing", "Your order is being processed. We will update you once it is ready for shipment."});
//        emailTemplates.put("PICKED_UP", new String[]{"Goods Picked Up", "The goods have been picked up from the warehouse and are on the way to the next destination."});
//        emailTemplates.put("ON_THE_WAY", new String[]{"Goods Shipped", "The goods are now on the way to your address. You can expect delivery soon."});
//        emailTemplates.put("DELIVERED", new String[]{"Goods Delivered", "The goods have been delivered to your address. Thank you for shopping with us!"});
//        emailTemplates.put("CANCELLED", new String[]{"Order Cancelled", "Your order has been cancelled. If you have any questions, please contact customer service."});
//        emailTemplates.put("LOST", new String[]{"Order Lost", "We regret to inform you that your order has been marked as lost during shipment. Please contact our customer service for further assistance or to initiate a refund process."});
//    }
//
//    public void sendEmail(Email email) {
//        String sender = email.getSender();
//        String receiver = email.getReceiver();
//        String status = email.getStatus().toUpperCase();
//
//        // Get the template from the hashmap
//        String[] template = emailTemplates.getOrDefault(status, new String[]{"Order Update", "There is an update regarding your order. Please check your account for more details."});
//        String subject = template[0];
//        String content = template[1];
//
//        // Sending email
//        System.out.println("Sending Email...");
//        System.out.println("---------------------------------------");
//        System.out.println("From: " + sender);
//        System.out.println("To: " + receiver);
//        System.out.println("Subject: " + subject);
//        System.out.println("Content: " + content);
//        System.out.println("---------------------------------------");
//    }
//}

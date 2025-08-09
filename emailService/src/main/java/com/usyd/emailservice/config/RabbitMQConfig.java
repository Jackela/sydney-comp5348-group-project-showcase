package com.usyd.emailservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue orderStatusQueue() {
        return new Queue("orderStatusQueue", false);
    }
}
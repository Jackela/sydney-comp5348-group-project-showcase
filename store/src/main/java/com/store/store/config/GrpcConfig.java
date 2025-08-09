package com.store.store.config;

import com.bank.bank.service.BankServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcConfig {

    @Bean
    public ManagedChannel managedChannel() {
        return ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();
    }

    @Bean
    public BankServiceGrpc.BankServiceBlockingStub bankServiceBlockingStub(ManagedChannel channel) {
        return BankServiceGrpc.newBlockingStub(channel);
    }
}
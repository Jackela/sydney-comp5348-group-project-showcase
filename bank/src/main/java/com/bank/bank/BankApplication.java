package com.bank.bank;

import com.bank.bank.service.impl.BankServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;


import java.io.IOException;


import io.grpc.Server;
import io.grpc.ServerBuilder;

import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class BankApplication {

	public static void main(String[] args) throws IOException, InterruptedException {
		ApplicationContext context = SpringApplication.run(BankApplication.class, args);
		BankServiceImpl bankServiceImpl = context.getBean(BankServiceImpl.class);

		Server server = ServerBuilder.forPort(50051)
				.addService(bankServiceImpl)
				.build();

		server.start();
		System.out.println("Server started on port 50051");
		server.awaitTermination();
	}

	@Bean
	public Server grpcServer(BankServiceImpl bankServiceImpl) throws IOException {
		return ServerBuilder.forPort(50051)
				.addService(bankServiceImpl)
				.build();
	}

}

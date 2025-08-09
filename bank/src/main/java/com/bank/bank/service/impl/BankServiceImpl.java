package com.bank.bank.service.impl;

import com.bank.bank.model.User;
import com.bank.bank.repository.UserRepository;
import com.bank.bank.service.BankServiceGrpc;
import com.bank.bank.service.BankServiceOuterClass.DeductAmountRequest;
import com.bank.bank.service.BankServiceOuterClass.DeductAmountResponse;
import io.grpc.stub.StreamObserver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankServiceImpl extends BankServiceGrpc.BankServiceImplBase {

    private final UserRepository userRepository;

    public BankServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void deductAmount(DeductAmountRequest request, StreamObserver<DeductAmountResponse> responseObserver) {
        try {
            if (userRepository == null) {
                System.err.println("userRepository is null");
                throw new IllegalStateException("userRepository is not initialized");
            }

            boolean success = processDeduction(request.getOrderId(), request.getUserId(), request.getAmount());

            DeductAmountResponse response = DeductAmountResponse.newBuilder()
                    .setSuccess(success)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            System.err.println("Error during deduction: " + e.getMessage());
            responseObserver.onError(e);
        }
    }

    private boolean processDeduction(long orderId, long userId, double amount) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            System.err.println("User not found: " + userId);
            return false;
        }

        if (user.getBalance() < amount) {
            System.err.println("Insufficient funds for user: " + userId);
            return false;
        }

        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);
        return true;
    }
}

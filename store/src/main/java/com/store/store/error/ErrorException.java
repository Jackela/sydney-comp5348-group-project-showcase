package com.store.store.error;

public class ErrorException extends RuntimeException {

    private final int errorCode;
    private final String errorMessage;

    public ErrorException(int errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public int getErrorCode() {
        return errorCode;
    }

    @Override
    public String getMessage() {
        return errorMessage;
    }
}

package com.store.store.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ErrorException.class)
    public ResponseEntity<Map<String, Object>> handleInsufficientStockException(ErrorException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("errorCode", ex.getErrorCode());
        response.put("errorMessage", ex.getMessage());

        // 返回自定义的错误码，并将其映射为对应的 HTTP 状态码
        HttpStatus status = HttpStatus.valueOf(ex.getErrorCode());

        return new ResponseEntity<>(response, status);
    }
}
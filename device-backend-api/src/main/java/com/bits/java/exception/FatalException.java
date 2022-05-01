package com.bits.java.exception;

public class FatalException extends RuntimeException{

    public FatalException(String message){
        super(message);
    }
    public FatalException(String message, Throwable t){
        super(message,t);
    }
}

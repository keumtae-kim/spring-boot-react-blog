package me.ktkim.blog.common.Exception;

import org.springframework.http.HttpStatus;

/**
 * @author Keumtae Kim
 */
public class ApiException extends RuntimeException {

    private static final long serialVersionUID = -4642753456084299295L;
    private String exceptionCode;
    private HttpStatus httpStatus;

    public ApiException(Throwable cause, HttpStatus httpStatus) {
        super(cause);
        setHttpStatus(httpStatus);
    }

    public ApiException(String message, HttpStatus httpStatus) {
        super(message);
        setHttpStatus(httpStatus);
    }

    public String getExceptionCode() {
        return exceptionCode;
    }

    public void setExceptionCode(String exceptionCode) {
        this.exceptionCode = exceptionCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
}
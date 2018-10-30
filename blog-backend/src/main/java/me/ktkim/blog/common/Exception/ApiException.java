package me.ktkim.blog.common.Exception;

import org.springframework.http.HttpStatus;

/**
 * @author Kim Keumtae
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

    public ApiException(String message) {
        super(message);
        setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
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
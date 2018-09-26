package me.ktkim.blog.security.jwt;

import me.ktkim.blog.model.BaseModel;

/**
 * @author Kim Keumtae
 */
public class JwtAuthResponse extends BaseModel {

    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;

    public JwtAuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
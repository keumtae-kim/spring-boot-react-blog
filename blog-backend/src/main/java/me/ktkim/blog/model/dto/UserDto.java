package me.ktkim.blog.model.dto;

import lombok.Data;
import me.ktkim.blog.model.domain.Authority;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Kim Keumtae
 */
public class UserDto {

    @Data
    public static class Create {
        private Long id;
        private String email;
        private String password;
        private String userName;
        private Set<String> authorities;
        private String createdBy;
        private LocalDateTime createdDate;
        private String lastModifiedBy;
        private LocalDateTime lastModifiedDate;
    }

    @Data
    public static class Update {
        private Long id;
        private String email;
        private Set<String> authorities;
    }

    @Data
    public static class Response {
        private Long id;
        private String email;
        private Set<String> authorities;


        public void setAuthorities(Set<Authority> authorities) {
            this.authorities = authorities.stream().map(Authority::getName).collect(Collectors.toSet());
        }
    }

    @Data
    public static class Login {
        private String login;
        @Size(min = 4, max = 12)
        private String password;
    }
}
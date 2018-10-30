package me.ktkim.blog.model.dto;

import lombok.Data;
import me.ktkim.blog.model.domain.Post;

import java.time.LocalDateTime;

/**
 * @author Kim Keumtae
 */
@Data
public class PostDto {

    private Long id;
    private String title;
    private String body;
    private Long userId;
    private String userName;
    private String createdBy;
    private LocalDateTime createdDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;

    public PostDto () {}

    public PostDto (Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.body = post.getBody();
        this.createdBy = post.getCreatedBy();
        this.createdDate = post.getCreatedDate();
        this.lastModifiedBy = post.getLastModifiedBy();
        this.lastModifiedDate = post.getLastModifiedDate();
        this.userId = post.getUser().getId();
        this.userName = post.getUser().getUserName();
    }
}

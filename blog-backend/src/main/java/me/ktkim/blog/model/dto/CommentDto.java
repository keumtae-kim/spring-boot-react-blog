package me.ktkim.blog.model.dto;

import lombok.Data;
import me.ktkim.blog.model.domain.Comment;
import me.ktkim.blog.model.domain.Post;

import java.time.LocalDateTime;

/**
 * @author Kim Keumtae
 */
@Data
public class CommentDto {

    private Long id;
    private String userName;
    private String body;
    private Long postId;
    private Long userId;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;


    public CommentDto() {}

    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.userName = comment.getUser().getUserName();
        this.body = comment.getBody();
        this.postId = comment.getPost().getId();
        this.userId = comment.getUser().getId();
        this.createdDate = comment.getCreatedDate();
        this.lastModifiedDate = comment.getLastModifiedDate();
    }
}

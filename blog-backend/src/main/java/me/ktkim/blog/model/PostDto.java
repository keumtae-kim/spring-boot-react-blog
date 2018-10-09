package me.ktkim.blog.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Kim Keumtae
 */
@Data
public class PostDto {

    private Long id;
    private String title;
    private String body;
    private Long userId;

    public PostDto () {}

    public PostDto (Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.body = post.getBody();
        this.userId = post.getUser().getId();
    }
}

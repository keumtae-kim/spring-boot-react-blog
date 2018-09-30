package me.ktkim.blog.model;

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
}

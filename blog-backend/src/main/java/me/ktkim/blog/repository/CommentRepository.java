package me.ktkim.blog.repository;

import me.ktkim.blog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Kim Keumtae
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
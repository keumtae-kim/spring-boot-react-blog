package me.ktkim.blog.repository;

import me.ktkim.blog.model.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Kim Keumtae
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
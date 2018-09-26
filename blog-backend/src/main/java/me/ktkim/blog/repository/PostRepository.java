package me.ktkim.blog.repository;

import me.ktkim.blog.model.Post;
import me.ktkim.blog.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Kim Keumtae
 */
public interface PostRepository extends JpaRepository<Post, Long> {
}
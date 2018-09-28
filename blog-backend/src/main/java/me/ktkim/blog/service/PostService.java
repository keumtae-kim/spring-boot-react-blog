package me.ktkim.blog.service;

import me.ktkim.blog.model.Post;
import me.ktkim.blog.model.User;
import me.ktkim.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Kim Keumtae
 */
@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Optional<Post> findForId(Long id) {
        return postRepository.findById(id);
    }
    public Post save(Post post) {
        return postRepository.saveAndFlush(post);
    }

    public Page<Post> findByUserOrderedByDatePageable(User user, Pageable pageable) {
        return postRepository.findByUserOrderByCreatedByDesc(user, pageable);
    }

    public Page<Post> findAllByOrderByCreatedByDescPageable(Pageable pageable) {
        return postRepository.findAllByOrderByCreatedByDesc(pageable);
    }

    public void delete(Post post) {
        postRepository.delete(post);
    }
}

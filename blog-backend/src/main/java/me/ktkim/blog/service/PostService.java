package me.ktkim.blog.service;

import me.ktkim.blog.model.Post;
import me.ktkim.blog.model.PostDto;
import me.ktkim.blog.model.User;
import me.ktkim.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Post registerPost(PostDto postDto) {
        Post newPost = new Post();
        newPost.setTitle(postDto.getTitle());
        newPost.setBody(postDto.getBody());
        newPost.setUser(new User(postDto.getUserId()));
        return postRepository.saveAndFlush(newPost);
    }

    public Page<Post> findByUserOrderedByCreatedDatePageable(User user, Pageable pageable) {
        return postRepository.findByUserOrderByCreatedDateDesc(user, pageable);
    }

    public Page<Post> findAllByOrderByCreatedDateDescPageable(Pageable pageable) {
        return postRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    public void delete(Post post) {
        postRepository.delete(post);
    }

}

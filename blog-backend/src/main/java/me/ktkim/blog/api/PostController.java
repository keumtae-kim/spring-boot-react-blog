package me.ktkim.blog.api;

import me.ktkim.blog.common.Exception.ApiException;
import me.ktkim.blog.model.Post;
import me.ktkim.blog.model.PostDto;
import me.ktkim.blog.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


/**
 * @author Kim Keumtae
 */
@RestController
@RequestMapping("/api")
public class PostController {

    private final Logger log = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @GetMapping(value = "/posts/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        Post post = postService.findForId(id).orElseThrow(() -> new ApiException("Post does not exist", HttpStatus.NOT_FOUND));
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping(value = "/posts")
    public ResponseEntity<List<Post>> getPostList(Pageable pageable) {
        log.debug("REST request to get Posts : {}", pageable);
        Page<Post> posts = postService.findAllByOrderByCreatedDateDescPageable(pageable);
        return new ResponseEntity<>(posts.getContent(), HttpStatus.OK);
    }

    @PostMapping(value = "/posts")
    public ResponseEntity<Void> registerPost(@RequestBody PostDto postDto) {
        log.debug("REST request to save Post : {}", postDto);
        if (postDto.getId() != null) {
            throw new ApiException("A new post cannot already have an ID", HttpStatus.CONFLICT);
        } else {
            postService.registerPost(postDto);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping(value = "/posts/{id}")
    public ResponseEntity<Void> editPost(@PathVariable Long id,
                                         @RequestBody PostDto postDto) {
        log.debug("REST request to edit Post : {}", postDto);
        Optional<Post> post = postService.findForId(id);
        if (!post.isPresent()) {
            throw new ApiException("Post could not be found", HttpStatus.NOT_FOUND);
        }
        postService.editPost(postDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
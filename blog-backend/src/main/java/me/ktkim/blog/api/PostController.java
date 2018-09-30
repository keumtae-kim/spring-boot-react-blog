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


/**
 * @author Kim Keumtae
 */
@RestController
@RequestMapping("/api")
public class PostController {

    private final Logger log = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @GetMapping(value = "/post/{id}")
    public Post getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        return postService.findForId(id).orElseThrow(() -> new ApiException("Post does not exist", HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/posts")
    public Page<Post> getPostList(Pageable pageable) {
        log.debug("REST request to get Posts : {}", pageable);
        return postService.findAllByOrderByCreatedDateDescPageable(pageable);
    }

    @PostMapping(value = "/posts")
    public ResponseEntity<Void> registerPost(@RequestBody PostDto postDto) {
        log.debug("REST request to save Post : {}", postDto);
        if (postDto.getId() != null) {
            throw new ApiException("A new post cannot already have an ID", HttpStatus.CONFLICT);
            // Lowercase the user login before comparing with database
        } else {
            postService.registerPost(postDto);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

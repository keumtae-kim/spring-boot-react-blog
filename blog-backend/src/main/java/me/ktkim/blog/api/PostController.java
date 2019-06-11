package me.ktkim.blog.api;

import me.ktkim.blog.common.Exception.ApiException;
import me.ktkim.blog.model.domain.Post;
import me.ktkim.blog.model.dto.PostDto;
import me.ktkim.blog.security.CurrentUser;
import me.ktkim.blog.security.service.CustomUserDetails;
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
    public ResponseEntity<PostDto> getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        Post post = postService.findForId(id).orElseThrow(() -> new ApiException("Post does not exist", HttpStatus.NOT_FOUND));
        return new ResponseEntity<>(new PostDto(post), HttpStatus.OK);
    }

    @GetMapping(value = "/posts")
    public ResponseEntity<List<PostDto>> getPostList(Pageable pageable) {
        log.debug("REST request to get Posts : {}", pageable);
        Page<Post> posts = postService.findAllByOrderByCreatedDateDescPageable(pageable);
        Page<PostDto> postDto = posts.map(post -> new PostDto((post)));
        return new ResponseEntity<>(postDto.getContent(), HttpStatus.OK);
    }

    @PostMapping(value = "/posts")
    public ResponseEntity<PostDto> registerPost(@RequestBody PostDto postDto,
                                                @CurrentUser CustomUserDetails customUserDetails) {
        log.debug("REST request to save Post : {}", postDto);
        if (postDto.getId() != null) {
            throw new ApiException("A new post cannot already have an ID", HttpStatus.CONFLICT);
        } else {
            PostDto returnPost = postService.registerPost(postDto, customUserDetails);
            return new ResponseEntity<PostDto>(returnPost, HttpStatus.CREATED);
        }
    }

    @PutMapping(value = "/posts/{id}")
    public ResponseEntity<PostDto> editPost(@PathVariable Long id,
                                            @RequestBody PostDto postDto) {
        log.debug("REST request to edit Post : {}", postDto);
        Optional<Post> post = postService.findForId(id);
        if (!post.isPresent()) {
            throw new ApiException("Post could not be found", HttpStatus.NOT_FOUND);
        }
        Optional<PostDto> returnPost = postService.editPost(postDto);
        return returnPost.map(response -> {
            return new ResponseEntity<PostDto>(response, HttpStatus.OK);
        }).orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping(value = "/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        log.debug("REST request to delete Post id : {}", id);
        if (id == null) {
            throw new ApiException("Post id cannot null", HttpStatus.NOT_FOUND);
        } else {
            postService.deletePost(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}

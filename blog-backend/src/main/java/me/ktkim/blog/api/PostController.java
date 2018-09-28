package me.ktkim.blog.api;

import me.ktkim.blog.common.Exception.ApiException;
import me.ktkim.blog.model.Post;
import me.ktkim.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


/**
 * @author Kim Keumtae
 */
@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping(value = "/post/{id}")
    public Post getPost(@PathVariable Long id) {
        return postService.findForId(id).orElseThrow(() -> new ApiException("Post does not exist", HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/posts")
    public Page<Post> getPostList(Pageable pageable) {
        return postService.findAllByOrderByCreatedByDescPageable(pageable);
    }
}

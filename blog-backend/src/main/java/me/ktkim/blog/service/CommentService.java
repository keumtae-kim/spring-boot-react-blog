package me.ktkim.blog.service;

import me.ktkim.blog.model.domain.Comment;
import me.ktkim.blog.model.domain.Post;
import me.ktkim.blog.model.domain.User;
import me.ktkim.blog.model.dto.CommentDto;
import me.ktkim.blog.model.dto.PostDto;
import me.ktkim.blog.repository.CommentRepository;
import me.ktkim.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @author Kim Keumtae
 */
@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Optional<Comment> findForId(Long id) {
        return commentRepository.findById(id);
    }

    public Optional<List<Comment>> findCommentsByPostId(Long id) {
        return commentRepository.findByPostId(id);
    }

    public CommentDto registerComment(CommentDto commentDto) { // temporary code
        Comment newComment = new Comment();
        newComment.setBody(commentDto.getBody());
        newComment.setPost(new Post(commentDto.getPostId()));
        newComment.setUser(new User(commentDto.getUserId()));
        return new CommentDto(commentRepository.saveAndFlush(newComment));
    }

    public Optional<CommentDto> editPost(CommentDto editCommentDto) {
        return this.findForId(editCommentDto.getId())
                .map(comment -> {
                    comment.setBody(editCommentDto.getBody());
                    return comment;
                })
                .map(CommentDto::new);
    }

    public void deletePost(Long id) {
        commentRepository.findById(id).ifPresent(comment -> {
            commentRepository.delete(comment);
        });
    }
}

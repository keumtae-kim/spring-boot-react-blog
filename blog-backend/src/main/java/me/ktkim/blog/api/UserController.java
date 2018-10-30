package me.ktkim.blog.api;

import me.ktkim.blog.common.Exception.ApiException;
import me.ktkim.blog.model.domain.User;
import me.ktkim.blog.model.dto.UserDto;
import me.ktkim.blog.repository.UserRepository;
import me.ktkim.blog.security.CurrentUser;
import me.ktkim.blog.security.UserPrincipal;
import me.ktkim.blog.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author Kim Keumtae
 */
@RestController
@CrossOrigin
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final String CHECK_ERROR_MESSAGE = "Incorrect password";

    @PostMapping(path = "/register",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public ResponseEntity registerAccount(@Valid @RequestBody UserDto.Create userDto) {

        HttpHeaders textPlainHeaders = new HttpHeaders();
        textPlainHeaders.setContentType(MediaType.TEXT_PLAIN);
        if (!!StringUtils.isEmpty(userDto.getPassword()) &&
                userDto.getPassword().length() >= 4 && userDto.getPassword().length() <= 10) {
            return new ResponseEntity<>(CHECK_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
        userService.registerAccount(userDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/users/{email}")
    public ResponseEntity<UserDto.Response> getUser(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .map(user -> modelMapper.map(user, UserDto.Response.class))
                .map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping(path = "/user/update-password",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public ResponseEntity updatePassword(@Valid @RequestBody UserDto.Login userDto) {
        userService.updatePassword(userDto.getLogin(), userDto.getPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ApiException("User", HttpStatus.NOT_FOUND));
    }
}
package me.ktkim.blog.api;

import me.ktkim.blog.common.Exception.ApiException;
import me.ktkim.blog.common.util.AuthProvider;
import me.ktkim.blog.model.domain.User;
import me.ktkim.blog.model.request.LoginRequest;
import me.ktkim.blog.model.request.SignUpRequest;
import me.ktkim.blog.repository.UserRepository;
import me.ktkim.blog.security.CurrentUser;
import me.ktkim.blog.security.jwt.JwtAuthResponse;
import me.ktkim.blog.security.jwt.JwtUtil;
import me.ktkim.blog.security.service.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collections;

/**
 * @author Kim Keumtae
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired(required = true)
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String AUTHORIZATION_HEADER = "Authorization";


    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest request
            , @RequestParam(value = "rememberMe", defaultValue = "false", required = false) boolean rememberMe
            , HttpServletResponse response) throws AuthenticationException {
        log.debug("REST request to authenticate : {}", request.getEmail());
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        try {
            Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = "Bearer " + jwtUtil.createToken(authentication, rememberMe);
            response.addHeader(AUTHORIZATION_HEADER, jwt);
            return ResponseEntity.ok(new JwtAuthResponse(jwt));
        } catch (AuthenticationException ae) {
            log.trace("Authentication exception trace: {}", ae);
            return new ResponseEntity<>(Collections.singletonMap("AuthenticationException",
                    ae.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser CustomUserDetails CustomUserDetails) {
        log.debug("REST request to get user : {}", CustomUserDetails.getEmail());
        return userRepository.findById(CustomUserDetails.getId())
                .orElseThrow(() -> new ApiException("User", HttpStatus.NOT_FOUND));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        log.debug("REST request to signup : {}", signUpRequest.getEmail());
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email address already in use.");
        }

        User user = new User();
        user.setUserName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);

        return new ResponseEntity<User>(result, HttpStatus.CREATED);
    }
}

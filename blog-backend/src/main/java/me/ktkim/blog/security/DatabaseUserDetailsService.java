package me.ktkim.blog.security;

import me.ktkim.blog.model.domain.User;
import me.ktkim.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Kim Keumtae
 */
@Component
public class DatabaseUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String email) {
        String lowercaseEmail = email.toLowerCase();
        Optional<User> userFromDatabase = userRepository.findOneWithAuthoritiesByEmail(lowercaseEmail);
        return userFromDatabase.map(user -> {
            List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                    .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                    .collect(Collectors.toList());
            return new org.springframework.security.core.userdetails.User(lowercaseEmail, user.getPassword(), grantedAuthorities);
        }).orElseThrow(() -> new UsernameNotFoundException("사용자 " + lowercaseEmail + "DB에 존재하지 않습니다."));
    }
}
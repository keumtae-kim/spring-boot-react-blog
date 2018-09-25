INSERT INTO user (id, login, password_hash, name, email, activated, created_by, created_date) VALUES
 ( 1, 'admin1', '$2a$10$9i/vfmfdXZ/WFm5EMZfLkO4aNRIOsbRSe1b8CzrJfxIJIUwDU5.7m', 'admin1','admin@email.com', true, 'system', now());

 INSERT INTO user (id, login, password_hash, name, email, activated, created_by, created_date) VALUES
 ( 2, 'user1', '$2a$10$qdx/aFpSyP3AT/YBh9nEq.DYRV7juqUhPG.KjW.lIZUUPfrxuUkGG', 'kkt','user1@email.com', true, 'system', now());


INSERT INTO authority (name) VALUES
 ('ROLE_ADMIN'), ('ROLE_USER' );

INSERT INTO user_authority (user_id,authority_name) VALUES
 ( 1, 'ROLE_ADMIN'), (1, 'ROLE_USER'), (2, 'ROLE_USER');
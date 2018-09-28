INSERT INTO user (user_id, email, password_hash, created_by, created_date) VALUES
 ( 1, 'admin@email.com', '$2a$10$9i/vfmfdXZ/WFm5EMZfLkO4aNRIOsbRSe1b8CzrJfxIJIUwDU5.7m', 'system', now());

 INSERT INTO user (user_id, email, password_hash, created_by, created_date) VALUES
 ( 2, 'user1@email.com', '$2a$10$qdx/aFpSyP3AT/YBh9nEq.DYRV7juqUhPG.KjW.lIZUUPfrxuUkGG', 'system', now());


INSERT INTO authority (name) VALUES
 ('ROLE_ADMIN'), ('ROLE_USER' );

INSERT INTO user_authority (user_id,authority_name) VALUES
 ( 1, 'ROLE_ADMIN'), (1, 'ROLE_USER'), (2, 'ROLE_USER');

INSERT INTO post (title, body, user_id, created_by, created_date) VALUES
 ( 'title 1', 'title1 body', '1', 'system', now());

INSERT INTO post (title, body, user_id, created_by, created_date) VALUES
 ( 'title 2', 'title2 body', '1', 'system', now());

INSERT INTO post (title, body, user_id, created_by, created_date) VALUES
 ( 'title 3', 'title3 body', '2', 'system', now());
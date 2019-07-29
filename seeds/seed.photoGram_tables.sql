BEGIN;

TRUNCATE
photoGram_albums,
photoGram_images,
photoGram_users
RESTART IDENTITY CASCADE;

INSERT INTO photoGram_users
    (full_name, user_name, email, password, profile_img_url)
VALUES
    ('Test User', 'TestUser', 'testuser@gmail.com', '$2y$12$L4DA4P288Fpuq9DD6IwBmOpxv9SwwgC9PUWM.nmNzCDxoSRmY6P6O', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/c6rayxdccufhmcq7rjc8'),
    ('Test User 2', 'TestUser2', 'testuser2@gmail.com', '$2y$12$6O8mcrKs5eGsgyO53ScZEu36qDNvdCglanoxefZucg1M0xQmrcmMC', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/daeg97zfdkkqjhc3jbgo');
    


INSERT INTO photoGram_albums
    (album_name, img_url, user_id)
VALUES
    ('Jewlery','https://res.cloudinary.com/rcarville/image/upload/photoGram_Album_Images/r2hp55y6f0urpgnqwg0j', 1),
    ('People', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Album_Images/x8auz5mf1r75loyritia', 1),
    ('Food', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Album_Images/plxqbspvbdcq45kiqf2g', 2);

INSERT INTO photoGram_images
    (user_id, img_url, album_id, tags, caption)
VALUES
    (1, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/d3aiqvd7ewr6q5bdcssw', 2, 'portrait', 
    'James Wright owner of Denim'),
    (1, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/a1xbcd3ehc1p0yp8mbb2', 2, 'portrait', 
    'Billy Chang Senior Portrait'),
    (2, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/a1xbcd3ehc1p0yp8mbb2', 2, '', 
    'Some caption here'),
    (2, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/a1xbcd3ehc1p0yp8mbb2', 1, 'animal,dog', 
    'Some other caption here'),
    (1, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_Images/jx2fk8ep2nqh33fyyook', 2, 'clothing',
    'Denim Clothing');

INSERT INTO photoGram_landingPage
    (mobile_Img_Url, desktop_Img_Url)
VALUES
    ('http://beardystudios.com/Bloc_Capstone/photoGram/images/landingPage-example.png',
    'http://beardystudios.com/Bloc_Capstone/photoGram/images/desktop-example.png');
    
COMMIT;

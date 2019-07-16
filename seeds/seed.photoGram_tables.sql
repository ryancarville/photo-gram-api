BEGIN;

TRUNCATE
photoGram_albums,
photoGram_images,
photoGram_users
RESTART IDENTITY CASCADE;

INSERT INTO photoGram_users
    (full_name, user_name, email, password, profile_img_url)
VALUES
    ('Ryan Carville', 'RCarville', 'ryancarville@gmail.com', '$2y$12$L4DA4P288Fpuq9DD6IwBmOpxv9SwwgC9PUWM.nmNzCDxoSRmY6P6O', 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/02.jpg'),
    ('Zeenath Khan', 'zeenyK', 'zkhan@gmail.com', '$2y$12$cSGa8YDl0m26vi/.NHD5aeb5koEbRXTflIB/0fABk4i1RXecFuaZi', 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/03.jpg'),
    ('Sam Smith', '', 'sSmith@yahoo.com', '$2y$12$RdsNdejBNPJepmploYK9n.tdBPhUmUkvu7ax0yQigSHJiOJBf7EUe','http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/05.jpg');


INSERT INTO photoGram_albums
    (album_name, img_url)
VALUES
    ('dogs','http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/02.jpg'),
    ('cats', 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/05.jpg'),
    ('random', 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/03.jpg');

INSERT INTO photoGram_images
    (user_id, img_url, album_id, tags, caption)
VALUES
    (1, 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/02.jpg', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi,?'),
    (1, 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/01.jpg', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi,?'),
    (2, 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/04.jpg', 2, '', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (2, 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/06.jpg', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (1, 'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/03.jpg', 2, '',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?');

INSERT INTO photoGram_landingPage
    (mobile_Img_Url, desktop_Img_Url)
VALUES
    ('http://beardystudios.com/Bloc_Capstone/photoGram/images/landingPage-example.png',
    'http://beardystudios.com/Bloc_Capstone/photoGram/images/desktop-example.png');
    
COMMIT;

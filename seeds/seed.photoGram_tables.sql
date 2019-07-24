BEGIN;

TRUNCATE
photoGram_albums,
photoGram_images,
photoGram_users
RESTART IDENTITY CASCADE;

INSERT INTO photoGram_users
    (full_name, user_name, email, password, profile_img_url)
VALUES
    ('Ryan Carville', 'RCarville', 'ryancarville@gmail.com', '$2y$12$L4DA4P288Fpuq9DD6IwBmOpxv9SwwgC9PUWM.nmNzCDxoSRmY6P6O', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/ozs3goqyxhkgbawldrnn'),
    ('Zeenath Khan', 'zeenyK', 'zkhan@gmail.com', '$2y$12$cSGa8YDl0m26vi/.NHD5aeb5koEbRXTflIB/0fABk4i1RXecFuaZi', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/n1hmjhxxlbyevd05twc0'),
    ('Sam Smith', '', 'sSmith@yahoo.com', '$2y$12$RdsNdejBNPJepmploYK9n.tdBPhUmUkvu7ax0yQigSHJiOJBf7EUe','https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/ozs3goqyxhkgbawldrnn');


INSERT INTO photoGram_albums
    (album_name, img_url, user_id)
VALUES
    ('San Fransico','https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/naa75xtgjsldlmsisqjm', 1),
    ('People', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/ozs3goqyxhkgbawldrnn', 1),
    ('random', 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/n1hmjhxxlbyevd05twc0', 2);

INSERT INTO photoGram_images
    (user_id, img_url, album_id, tags, caption)
VALUES
    (1, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/naa75xtgjsldlmsisqjm', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi,?'),
    (1, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/ozs3goqyxhkgbawldrnn', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi,?'),
    (2, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/hhvgljlqi6obzu2313uw', 2, '', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (2, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/n1hmjhxxlbyevd05twc0', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (1, 'https://res.cloudinary.com/rcarville/image/upload/photoGram_profileImage/tmpxrewzdqwgobfvc07r', 2, '',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?');

INSERT INTO photoGram_landingPage
    (mobile_Img_Url, desktop_Img_Url)
VALUES
    ('http://beardystudios.com/Bloc_Capstone/photoGram/images/landingPage-example.png',
    'http://beardystudios.com/Bloc_Capstone/photoGram/images/desktop-example.png');
    
COMMIT;

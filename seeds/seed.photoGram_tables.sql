BEGIN;

TRUNCATE
photoGram_albums,
photoGram_images,
photoGram_users
RESTART IDENTITY CASCADE;

INSERT INTO photoGram_users
    (full_name, user_name, email, password, profile_img_url)
VALUES
    ('Ryan Carville', 'RCarville', 'ryancarville@gmail.com', '1!Aa2@Bb3#Cc', 'http://jdeokjwodnd.com'),
    ('Zeenath Khan', 'zeenyK', 'zkhan@gmail.com', '0)Pp9(Oo8*Ii', 'http://jdeokjwodnd.com'),
    ('Sam Smith', '', 'sSmith@yahoo.com', '4$Rr5%Tt6^Yy','http://jdeokjwodnd.com');


INSERT INTO photoGram_albums
    (album_name, img_url)
VALUES
    ('dogs','http://wsdwdwwddw.com'),
    ('cats', 'http://wsdwdwwddw.com'),
    ('random', 'http://wsdwdwwddw.com');

INSERT INTO photoGram_images
    (user_id, img_url, album_id, tags, caption)
VALUES
    (1, 'http://jdeokjwodnd.com', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (2, 'http://wsdwdwwddw.com', 2, '', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (2, 'http://jdeokjwodnd.com', 1, 'animal,dog', 
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    (3, 'http://wsdwdwwddw.com', 2, '',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?');

INSERT INTO photoGram_landingPage
    (mobile_Img_Url, desktop_Img_Url)
VALUES
    ('http://beardystudios.com/Bloc_Capstone/photoGram/images/landingPage-example.png',
    'http://beardystudios.com/Bloc_Capstone/photoGram/images/desktop-example.png');
    
COMMIT;

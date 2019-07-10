BEGIN;

TRUNCATE
photoGram_albums,
photoGram_images,
photoGram_users
RESTART IDENTITY CASCADE;

INSERT INTO photoGram_users
    (full_name, user_name, email, password)
VALUES
    ('Ryan Carville', 'RCarville', 'ryancarville@gmail.com', '1!Aa2@Bb3#Cc'),
    ('Zeenath Khan', 'zeenyK', 'zkhan@gmail.com', '0)Pp9(Oo8*Ii'),
    ('Sam Smith', '', 'sSmith@yahoo.com', '4$Rr5%Tt6^Yy');

INSERT INTO photoGram_images
    (imgUrl, tags, album_id, caption,)
VALUES
    ('http://jdeokjwodnd.com', 'animal,dog', 1,
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    ('http://wsdwdwwddw.com', '', 2,
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    ('http://jdeokjwodnd.com', 'animal,dog', 1,
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
    ('http://wsdwdwwddw.com', '', 2,
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?');

INSERT INTO photoGram_albums
    (album_name)
VALUES
    ('dogs'),
    ('cats'),
    ('random');

COMMIT;

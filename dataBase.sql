DROP DATABASE IF EXISTS video_games;
CREATE DATABASE video_games;

DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS systems;
CREATE TABLE systems (
    system_id int GENERATED ALWAYS AS IDENTITY,
    system VARCHAR(20),
    company VARCHAR(25),
    PRIMARY KEY(system_id)
);

CREATE TABLE games (
    game_id int GENERATED ALWAYS AS IDENTITY,
    game VARCHAR(30),
    rating VARCHAR(10),
    system_id int,
    PRIMARY KEY(game_id),
    CONSTRAINT fk_systems
        FOREIGN KEY(system_id)
            REFERENCES systems(system_id)
            ON DELETE CASCADE
);

INSERT INTO systems (system, company) VALUES
('Playstation', 'Sony'),
('Xbox', 'Microsoft'),
('Switch', 'Nintendo'),
('PC', 'Steam');

INSERT INTO games (game, rating, system_id) VALUES
('Breath of the Wild', 'Teen', 3),
('Escape From Tarkov', 'Mature', 4),
('New World', 'Teen', 4),
('World of Warcraft', 'Teen', 4),
('Halo', 'Mature', 2),
('Gears of War', 'Mature', 2),
('Bloodborne', 'Mature', 1),
('The Last of Us', 'Mature', 1);
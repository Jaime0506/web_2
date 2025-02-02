-- Crear la base de datos
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    phone VARCHAR(10) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL
)

-- Insertar datos de ej
INSERT INTO
	users (first_name, last_name, phone, address)
VALUES
	('Jaime', 'Mejia', '3014441423', 'Cra 3D #58-13'),
	('Yon', 'Montaña', '3124568967', 'Cra 45b #12-75'),
	('Irv', 'Rios', '3458768923', 'Cra 1 #23-35');

-- Comprobar
SELECT * FROM users;
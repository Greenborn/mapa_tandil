CREATE TABLE `reclamos` 
    (`id` VARCHAR(36) NOT NULL , 
    `titulo` VARCHAR(255) NOT NULL , 
    `detalles` VARCHAR(1024) NOT NULL , 
    `imagenes` JSON NOT NULL , 
    `ipv4` VARCHAR(255) NOT NULL,
    `ipv6` VARCHAR(255) NOT NULL, 
    `ts` DATETIME NOT NULL, 
    `user_agent` VARCHAR(255) NOT NULL,
    `posicion` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`)) ENGINE = InnoDB; 

CREATE TABLE `reportes` 
    (`id` VARCHAR(36) NOT NULL, 
    `detalle` VARCHAR(255) NOT NULL, 
    `ts` DATETIME NOT NULL, 
    `ipv4` VARCHAR(255) NOT NULL, 
    `ipv6` VARCHAR(255) NOT NULL, 
    `user_agent` VARCHAR(255) NOT NULL, 
    `reclamo_id` VARCHAR(36) NOT NULL, 
PRIMARY KEY (`id`(36))) ENGINE = InnoDB; 
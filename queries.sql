CREATE TABLE tmptable (
  idfoto VARCHAR(5),
  foto   TEXT,
  titulo TEXT,
  sector TEXT,
  lat    VARCHAR(20),
  lon    VARCHAR(20),
  anio   INT(4)
);

CREATE TABLE tmptable2 (
  idfoto VARCHAR(5),
  foto   TEXT,
  titulo TEXT,
  sector TEXT,
  lat    FLOAT(15, 10),
  lon    FLOAT(15, 10),
  anio   INT(4),
  punto  VARCHAR(100)
);


LOAD DATA INFILE '/srv/www/ACG/aereo/data/foto-formato.csv'
INTO TABLE tmptable2
COLUMNS
TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'

LINES TERMINATED BY '\n';


ALTER TABLE foto
  ADD COLUMN punto POINT;
ALTER TABLE tmptable
  ADD COLUMN punto VARCHAR(100);
ALTER TABLE foto
  CHANGE COLUMN latitud latitud FLOAT(15, 10);
ALTER TABLE foto
  CHANGE COLUMN longitud longitud FLOAT(15, 10);
ALTER TABLE tmptable
  CHANGE COLUMN lat lat VARCHAR(15);
ALTER TABLE tmptable
  CHANGE COLUMN lon lon VARCHAR(15);

SELECT left(lat, 9)
FROM tmptable;

INSERT INTO foto (idfoto, foto, titulo, sector, latitud, longitud, ano, punto)

  SELECT
    t.idfoto,
    t.foto,
    t.titulo,
    t.sector,
    t.lat,
    t.lon,
    t.anio,
    ST_PointFromText(punto)
  FROM tmptable2 t;


SELECT
  t.*,
  ST_PointFromText(CONCAT('Point(', t.lat, " ", t.lon, ")"))
FROM tmptable t;
DROP PROCEDURE IF EXISTS updateTmp;
CREATE PROCEDURE updateTmp()
  BEGIN
    DECLARE exit_loop BOOLEAN;
    DECLARE punto VARCHAR(100);
    DECLARE lati, longi VARCHAR(13);
    DECLARE f, ti, s, a TEXT;
    DECLARE tmp CURSOR FOR SELECT
                             tmptable.foto,
                             tmptable.titulo,
                             tmptable.sector,
                             tmptable.lat,
                             tmptable.lon,
                             tmptable.anio
                           FROM tmptable;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
    OPEN tmp;

    start_loop: LOOP


      FETCH tmp
      INTO f, ti, s, lati, longi, a;

      IF exit_loop
      THEN
        CLOSE tmp;
        LEAVE start_loop;
      END IF;
      SET lati = left(lati, 9);
      SET longi = left(longi, 9);
      SET punto = CONCAT('Point(', lati, " ", longi, ")");
      INSERT INTO foto (idfoto, foto, titulo, sector, latitud, longitud, ano, punto)
      VALUES (NULL, f, ti, s, left(lati, 9), left(longi, 9), a, ST_PointFromText(punto));
    END LOOP start_loop;


  END;
CALL updateTmp();

DELETE FROM tmptable
WHERE 1;
SELECT cast(lat AS DECIMAL(15, 10))
FROM tmptable
WHERE idfoto = 1;
SELECT 0 + tmptable.lat
FROM tmptable
WHERE idfoto = 1;
SELECT cast(lat AS FLOAT(15, 10))
FROM tmptable
WHERE idfoto = 1;
ALTER TABLE foto
  CONVERT TO CHARACTER SET utf8;

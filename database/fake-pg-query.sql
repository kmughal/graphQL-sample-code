

DROP DATABASE IF EXISTS Fake_Claim_Store;
CREATE DATABASE Fake_Claim_Store;
USE Fake_Claim_Store;
DROP TABLE IF EXISTS Adjusters;
DROP TABLE IF EXISTS Claims;
DROP TABLE IF EXISTS ClaimStatus;

CREATE TABLE Adjusters
(
  Id SERIAL PRIMARY KEY,
  Name VARCHAR(150),
  Country VARCHAR(150),
  CREATED_AT TIMESTAMP not null DEFAULT current_timestamp
);

CREATE TABLE ClaimStatus
(
  Id SERIAL PRIMARY KEY,
  Description VARCHAR(130),
  Created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Claims
(
  Id serial PRIMARY KEY,
  Claim_number VARCHAR(130),
  Instructed_Date TIMESTAMP,
  Loss_Date TIMESTAMP,
  AdjusterKey INT REFERENCES Adjusters(Id),
  ClaimStatusKey INT REFERENCES  ClaimStatus (Id),
  CREATED_AT TIMESTAMP not null DEFAULT current_timestamp
);


INSERT INTO Adjusters
  (Name , Country)
VALUES
  ('Khurram' , 'Pakistan'),
  ('Jone' , 'UK'),
  ('Peter' , 'USA');

INSERT INTO ClaimStatus
  (Description)
VALUES('Open'),
  ('Closed'),
  ('Re-open');


INSERT INTO Claims
  (Claim_number,Instructed_Date,Loss_Date,AdjusterKey,ClaimStatusKey)
VALUES('CK-0001-0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
  ('CK-0001-0002', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
  ('CK-0001-0003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 2),
  ('CK-0001-0004', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 3),
  ('CK-0001-0005', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 3),
  ('CK-0001-0006', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 2),
  ('CK-0001-0006', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 1);




-- add more rows here
SELECT *
FROM Adjusters;
SELECT *
FROM Claims;
SELECT *
FROM ClaimStatus;

SELECT c.* ,
  cs.Description as Claim_Status
FROM Claims c INNER JOIN ClaimStatus cs on cs.Id = c.ClaimStatusKey; 
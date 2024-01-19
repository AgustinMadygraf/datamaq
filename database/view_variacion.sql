CREATE VIEW variacion AS 
SELECT 
    a.ID, 
    a.unixtime,
    a.HR_COUNTER1_LO - COALESCE((SELECT b.HR_COUNTER1_LO 
                                  FROM maq_bolsas b 
                                  WHERE b.ID < a.ID 
                                  ORDER BY b.ID DESC 
                                  LIMIT 1), 0) AS variacion
FROM 
    maq_bolsas a;

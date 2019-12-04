UPDATE `wine_goods`
SET
`category_1st` = 'aaa' WHERE `kind` = '紅酒';

SELECT *
FROM `wine_goods
` WHERE `kind` = '紅酒';

UPDATE `wine_goods`
SET
`category_1st`='Bartending' WHERE `kind` = '紅酒';

UPDATE `wine_goods`
SET
`classification_PDC` = '28' WHERE `producing_countries`='臺灣';

UPDATE `wine_goods`
SET
`category_1st`=REPLACE( `category_1st` , 'Champagne','法國香檳');

SELECT DISTINCT `kind` FROM `wine_goods`
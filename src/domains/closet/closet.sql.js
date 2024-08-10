export const myClosetItemAtFirst = 
"SELECT c.brand_name, c.name, c.size, c.fit, c.likes "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? "
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"

export const myClosetItem = 
"SELECT c.brand_name, c.name, c.size, c.fit, c.likes, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.id < ? ";
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"

export const myClosetCategoryItemAtFirst = 
"SELECT c.brand_name, c.name, c.size, c.fit, c.likes "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.category_id = ? "
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"

export const myClosetCategoryItem = 
"SELECT c.brand_name, c.name, c.size, c.fit, c.likes, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.category_id = ? AND c.id < ? ";
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"


export const getClothByClothId = 
"SELECT m.uuid, c.id, c.brand_name, c.name, c.product_code, c.size, c.fit, c.color, c.url, c.memo "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "WHERE c.id = ? ;"
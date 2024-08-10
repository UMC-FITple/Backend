export const myClosetItemAtFirst = 
"SELECT c.brand_name, c.name, c.size, c.fit "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? "
+ "ORDER BY c.id DESC LIMIT ? ;"

export const myClosetItem = 
"SELECT m.nickname, c.brand_name, c.name, c.size, c.fit, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.id < ? ";
+ "ORDER BY c.id DESC LIMIT ? ;"

export const myClosetCategoryItemAtFirst = 
"SELECT m.nickname, c.brand_name, c.name, c.size, c.fit "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.category_id = ? "
+ "ORDER BY c.id DESC LIMIT ? ;"

export const myClosetCategoryItem = 
"SELECT m.nickname, c.brand_name, c.name, c.size, c.fit, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.category_id = ? AND c.id < ? ";
+ "ORDER BY c.id DESC LIMIT ? ;"


export const getClothByClothId = 
"SELECT m.uuid, c.id, c.brand_name, c.name, c.product_code, c.size, c.fit, c.color, c.url, c.memo "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "WHERE c.id = ? ;"
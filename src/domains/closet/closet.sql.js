export const myClosetItemAtFirst = 
"SELECT c.id, c.brand_name, c.name, c.size, c.fit, c.likes "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? "
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"

export const myClosetItem = 
"SELECT c.id, c.brand_name, c.name, c.size, c.fit, c.likes "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.id < ? ";
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"

export const myClosetCategoryItemAtFirst = 
"SELECT c.id, c.brand_name, c.name, c.size, c.fit, c.likes "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.category_id = ? "
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"

export const myClosetCategoryItem = 
"SELECT c.id, c.brand_name, c.name, c.size, c.fit, c.likes "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.category_id = ? AND c.id < ? ";
+ "ORDER BY c.likes DESC, c.id DESC LIMIT ? ;"


export const getClothByClothId = 
"SELECT c.uuid, c.id, c.brand_name, c.name, c.product_code, c.size, c.fit, c.color, c.url, c.memo "
+ "FROM cloth c "
+ "WHERE c.uuid = ? AND c.id = ? ;"

export const getUserByClothId = 
"SELECT c.uuid, c.id "
+ "FROM cloth c "
+ "WHERE c.id = ? ;"

export const getRealSizeByClothId = 
"SELECT c.id, r.length, r.shoulder, r.chest, r.armhole, r.sleeve, r.sleeve_length, r.hem "
+ "FROM cloth c JOIN real_size r on c.id = r.cloth_id "
+ "WHERE c.id = ? ;"
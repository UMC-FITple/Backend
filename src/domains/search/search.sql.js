export const UserNicknameToClothId = 
"SELECT c.id, m.nickname, m.img_url, c.brand_name, c.name, c.size, c.fit, c.cloth_img "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "ORDER BY c.id DESC ;"

export const UserCategoryToClothId = 
"SELECT c.id, m.nickname, m.img_url, c.brand_name, c.name, c.size, c.fit, c.cloth_img "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.category_id = ? "
+ "ORDER BY c.id DESC ;"

export const getClothByClothId = 
"SELECT m.uuid, c.id, c.brand_name, c.name, c.product_code, c.size, c.fit, c.color, c.url, c.memo, c.cloth_img, c.category_id "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "WHERE c.id = ? ;"

export const getUserIdToClothId = 
"SELECT m.uuid "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "WHERE c.id = ? ;"

//user+body_info
export const getUser = 
"SELECT m.uuid, m.nickname, m.img_url, m.one_line_info, b.height, b.weight "
+ "FROM body_info b JOIN member m on b.uuid = m.uuid "
+ "WHERE b.uuid = ? ;"

export const getFitToUserId =
"SELECT uf.uuid, uf.pf_name "
+ "FROM user_fit uf "
+ "WHERE uf.uuid = ? ;"

export const getStyleToUserId =
"SELECT us.uuid, us.style_name "
+ "FROM user_style us "
+ "WHERE us.uuid = ? ;"


export const UserNicknameToClothName = 
"SELECT c.id, m.nickname, m.img_url, c.brand_name, c.name, c.size, c.fit, c.cloth_img "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.name REGEXP ? "
+ "ORDER BY c.id DESC ;"

export const UserCategoryToClothName = 
"SELECT c.id, m.nickname, m.img_url, c.brand_name, c.name, c.size, c.fit, c.cloth_img "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.name REGEXP ? AND c.category_id = ? "
+ "ORDER BY c.id DESC ;"

export const brandToBrandName = 
"SELECT b.id, b.name, b.eng_name, b.brand_img "
+ "FROM brand b "
+ "WHERE b.name REGEXP ? "
+ "ORDER BY b.id ;"

export const userIdToNickname = 
"SELECT m.uuid "
+ "FROM member m "
+ "WHERE m.nickname REGEXP ? ;"

export const userToNickname = 
"SELECT m.uuid, m.nickname, m.img_url, b.height, b.weight "
+ "FROM body_info b JOIN member m on b.uuid = m.uuid "
+ "WHERE m.uuid = ? "
+ "ORDER BY m.uuid ;"


export const getBrandToBrandId = 
"SELECT b.id, b.name, b.eng_name, b.brand_img "
+ "FROM brand b "
+ "WHERE b.id = ? ; "

export const userToBrand = 
"SELECT m.nickname, m.img_url, c.id, c.brand_name, c.name, c.size, c.fit, c.category_id, c.cloth_img "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "JOIN brand b on c.brand_name = b.name "
+ "WHERE b.id = ? "
+ "ORDER BY c.id DESC ;"

export const categoryToBrand = 
"SELECT m.nickname, m.img_url, c.id, c.brand_name, c.name, c.size, c.fit, c.category_id, c.cloth_img "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "JOIN brand b on c.brand_name = b.name "
+ "WHERE b.id = ? AND c.category_id = ? "
+ "ORDER BY c.id DESC ;"

export const clothToBrand = 
"SELECT m.nickname, m.img_url, c.id, c.brand_name, c.name, c.size, c.fit, c.category_id, c.cloth_img "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "JOIN brand b on c.brand_name = b.name "
+ "WHERE b.id = ? AND c.name REGEXP ? "
+ "ORDER BY c.id DESC ;"

export const clothCategoryToBrand = 
"SELECT m.nickname, m.img_url, c.id, c.brand_name, c.name, c.size, c.fit, c.category_id, c.cloth_img "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "JOIN brand b on c.brand_name = b.name "
+ "WHERE b.id = ? AND c.name REGEXP ? AND c.category_id = ? "
+ "ORDER BY c.id DESC ;"

export const insertCloth = 
"INSERT INTO cloth (uuid, cloth_img, brand_name, name, product_code, category_id, size, fit, color, url, rating, memo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;"

export const insertRealSize = 
"INSERT INTO real_size (cloth_id, length, shoulder, chest, armhole, sleeve, sleeve_length, hem) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ;"

export const getCloth = "SELECT * FROM cloth WHERE id = ? ; "

export const addWish = "INSERT INTO wish (cloth_id, wisher_uuid) VALUES (?, ?) ;"
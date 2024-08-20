export const UserNicknameToClothIdAtFirst = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "ORDER BY c.id DESC LIMIT ? ;"

export const UserNicknameToClothId = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.id < ? ";
+ "ORDER BY c.id DESC LIMIT ? ;"

export const UserCategoryToClothIdAtFirst = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.category_id = ? "
+ "ORDER BY c.id DESC LIMIT ? ;"

export const UserCategoryToClothId = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.category_id = ? AND c.id < ? ";
+ "ORDER BY c.id DESC LIMIT ? ;"


export const getClothByClothId = 
"SELECT m.uuid, c.id, c.brand_name, c.name, c.product_code, c.size, c.fit, c.color, c.url, c.memo "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "WHERE c.id = ? ;"

export const getUserIdToClothId = 
"SELECT m.uuid "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "WHERE c.id = ? ;";

//user+body_info
export const getUser = 
"SELECT m.nickname, m.one_line_info, b.height, b.weight "
+ "FROM body_info b JOIN member m on b.uuid = m.uuid "
+ "WHERE b.uuid = ? ;";

export const getFitToUserId =
"SELECT uf.uuid, uf.pf_name "
+ "FROM user_fit uf "
+ "WHERE uf.uuid = ? ;";

export const getStyleToUserId =
"SELECT us.uuid, us.style_name "
+ "FROM user_style us "
+ "WHERE us.uuid = ? ;"


export const UserNicknameToClothNameAtFirst = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.name REGEXP ? "
+ "ORDER BY c.id DESC LIMIT 8 ;"

export const UserNicknameToClothName = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.name REGEXP ? AND c.id < ? ";
+ "ORDER BY c.id DESC LIMIT 8 ;"

export const UserCategoryToClothNameAtFirst = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.name REGEXP ? AND c.category_id = ? "
+ "ORDER BY c.id DESC LIMIT 8 ;"

export const UserCategoryToClothName = 
"SELECT c.id, m.nickname, c.brand_name, c.name, c.size, c.fit, c.id "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE c.name REGEXP ? AND c.category_id = ? AND c.id < ? ";
+ "ORDER BY c.id DESC LIMIT 8 ;"

export const brandToBrandName = 
"SELECT b.id, b.name, b.eng_name "
+ "FROM brand b "
+ "WHERE b.name REGEXP ? "
+ "ORDER BY b.id ;"

export const userIdToNickname = 
"SELECT m.uuid "
+ "FROM member m "
+ "WHERE m.nickname REGEXP ? ;";

export const userToNickname = 
"SELECT m.uuid, m.nickname, b.height, b.weight "
+ "FROM body_info b JOIN member m on b.uuid = m.uuid "
+ "WHERE m.uuid = ? "
+ "ORDER BY m.uuid ;"


export const getBrandToBrandId = 
"SELECT b.id, b.name, b.eng_name "
+ "FROM brand b "
+ "WHERE b.id = ? ; "

export const UserNicknameToBrand = 
"SELECT m.nickname, c.id, c.brand_name, c.name, c.size, c.fit "
+ "FROM cloth c JOIN member m on c.uuid = m.uuid "
+ "JOIN brand b on c.brand_name = b.name "
+ "WHERE b.id = ? "
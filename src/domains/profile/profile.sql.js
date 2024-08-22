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

export const getFollowerToUserId =
"SELECT count(*) FROM follow WHERE to_uuid = ? ;"

export const getFollowingToUserId =
"SELECT count(*) FROM follow WHERE from_uuid = ? ;"

export const getMyFitSQL =
"SELECT c.id, c.brand_name, c.name, c.size, c.fit, c.likes, c.cloth_img "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.likes = 1 "
+ "ORDER BY c.id DESC ;"

export const getMyFitCategorySQL =
"SELECT c.id, c.brand_name, c.name, c.size, c.fit, c.likes, c.cloth_img "
+ "FROM member m JOIN cloth c on c.uuid = m.uuid "
+ "WHERE m.uuid = ? AND c.likes = 1 AND c.category_id = ? "
+ "ORDER BY c.id DESC ;"

export const getWishSQL =
"SELECT m.uuid, m.nickname, m.img_url, c.id, c.brand_name, c.name, c.size, c.fit, c.likes, c.cloth_img "
+ "FROM cloth c JOIN wish w on c.id = w.cloth_id "
+ "JOIN member m on c.uuid = m.uuid "
+ "WHERE w.wisher_uuid = ? "
+ "ORDER BY c.id DESC ;"

export const getWishCategorySQL =
"SELECT m.uuid, m.nickname, m.img_url, c.id, c.brand_name, c.name, c.size, c.fit, c.likes, c.cloth_img "
+ "FROM cloth c JOIN wish w on c.id = w.cloth_id "
+ "JOIN member m on c.uuid = m.uuid "
+ "WHERE w.wisher_uuid = ? AND c.category_id = ? "
+ "ORDER BY c.id DESC ;"
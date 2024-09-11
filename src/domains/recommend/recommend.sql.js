export const getUser = 
"SELECT m.uuid, m.nickname, m.img_url, b.height, b.weight "
+ "FROM body_info b JOIN member m on b.uuid = m.uuid "
+ "WHERE b.uuid = ? ;"

export const findUserToBody =
"SELECT b.uuid "
+ "FROM body_info b "
+ "WHERE NOT uuid = ? and height BETWEEN ?-5 AND ?+5 "
+ "AND weight BETWEEN ?-5 AND ?+5 "
+ "ORDER BY ABS(height-?) + ABS(weight-?) ASC LIMIT 24;"

export const getFitToUserId =
"SELECT uf.uuid, uf.pf_name "
+ "FROM user_fit uf "
+ "WHERE uf.uuid = ? ;"

export const getStyleToUserId =
"SELECT us.uuid, us.style_name "
+ "FROM user_style us "
+ "WHERE us.uuid = ? ;"

export const findUserToFit =
"SELECT uf.uuid, uf.style_name "
+ "FROM user_fit uf "
+ "WHERE uf.pf_name = ? ;"
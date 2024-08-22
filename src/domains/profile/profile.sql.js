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
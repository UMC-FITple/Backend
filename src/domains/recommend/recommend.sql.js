// 체형 정보
export const getBodyinfo_sql = "SELECT * FROM bodyinfo";    // 모든 체형 정보 가져오기

export const getBodyinfoByID_sql = "SELECT * FROM bodyinfo WHERE uuid = ?"  // 특정 사용자의 체형 정보 가져오기

// 유저 정보
export const getMemberinfoByID_sql = "SELECT * FROM member WHERE uuid = ?"; // 특정 사용자의 회원 정보 가져오기

// 핏 정보

// 불러오는 방식 고민 필요!
export const getMemberFitsByID_sql = "select * from member_fit where uuid = ?"; // 특정 사용자의 선호 핏 가져오기

export const getFitByID_sql = "select * from fit where id = ?"  // 핏 아이디로 핏 정보(이름) 얻어오기

// 스타일 정보

// 불러오는 방식 고민 필요!
export const getMemberStylesByID_sql = "select * from member_style where uuid = ?"; // 특정 사용자의 선호 스타일 정보 가져오기

export const getStyleByID_sql = "select * from style where id = ?"  // 스타일 아이디로 스타일 정보(이름) 얻어오기

// 팔로우 관계인지 확인 : 1을 반환하면 팔로우 하지 않은 사용자 -> 추천에서 팔로우하지 않은 사용자로 추천하기 위해
export const confirmFollow_sql = "SELECT NOT EXISTS(SELECT 1 FROM store WHERE follower_id = ?) as isNotFollower";
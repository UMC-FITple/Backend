// 체형 정보
export const getBodyinfo_sql = "SELECT * FROM body_info";    // 모든 체형 정보 가져오기

export const getBodyinfoByID_sql = "SELECT * FROM body_info WHERE uuid in (?)"  // 특정 사용자의 체형 정보 가져오기

// 유저 정보
export const getMemberinfoByID_sql = "SELECT * FROM member WHERE uuid in (?)"; // 특정 사용자의 회원 정보 가져오기

// 핏 정보

export const getMemberFitsByID_sql = "select * from user_fit where uuid in (?)"; // 특정 사용자의 선호 핏 가져오기
// 스타일 정보

// 불러오는 방식 고민 필요!
export const getMemberStylesByID_sql = "select * from user_style where uuid in (?)"; // 특정 사용자의 선호 스타일 정보 가져오기

export const getMemberStyles_sql = "select * from user_style;"; // 특정 사용자의 선호 스타일 정보 가져오기


// 보류
// 팔로우 관계인지 확인 : 1을 반환하면 팔로우 하지 않은 사용자 -> 추천에서 팔로우하지 않은 사용자로 추천하기 위해
export const confirmFollow_sql = "SELECT NOT EXISTS(SELECT 1 FROM follow WHERE from_uuid = ?) as isNotFollower";

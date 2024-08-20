import { StatusCodes } from "http-status-codes";

export const status = {
  // success
  SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 200, message: "success!" },

  // error
  // common err
  INTERNAL_SERVER_ERROR: { status: StatusCodes.INTERNAL_SERVER_ERROR, isSuccess: false, code: "COMMON000", message: "서버 에러, 관리자에게 문의 바랍니다." },
  BAD_REQUEST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMON001", message: "잘못된 요청입니다." },
  UNAUTHORIZED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "COMMON002", message: "권한이 잘못되었습니다." },
  METHOD_NOT_ALLOWED: { status: StatusCodes.METHOD_NOT_ALLOWED, isSuccess: false, code: "COMMON003", message: "지원하지 않는 Http Method 입니다." },
  FORBIDDEN: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "COMMON004", message: "금지된 요청입니다." },
  NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "COMMON005", message: "요청한 페이지를 찾을 수 없습니다." },
  PARAMETER_IS_WRONG: { status: StatusCodes.PARAMETER_IS_WRONG, isSuccess: false, code: "COMMON006", message: "잘못된 파라미터가 전달되었습니다." },
  
  // signup err
  USERID_ALREADY_EXIST: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "SIGNUP001", message: "이미 존재하는 아이디입니다." },
  SIGNUP_EMPTY_DATA: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "SIGNUP002", message: "데이터가 비어있습니다." },
  SIGNUP_ERROR: { status: StatusCodes.FORBIDDEN,isSuccess: false, code: "SIGNUP003", message: "회원가입 에러" },

  // login err
  USER_NOT_FOUND: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "LOGIN001", message: "존재하지 않는 아이디입니다." },
  LOGIN_EMPTY_DATA: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "LOGIN002", message: "데이터가 비어있습니다." },
  PASSWORD_MISMATCH: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "LOGIN002", message: "비밀번호가 일치하지 않습니다." },

  // login middlewares err
  TOKEN_NOT_PROVIDED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "LOGINMIDDLEWARES001", message: "로그인이 필요합니다." },
  TOKEN_EXPIRED: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "LOGINMIDDLEWARES002", message: "토큰을 재발급 받아주세요." },
  INVALID_TOKEN: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "LOGINMIDDLEWARES003", message: "유효하지 않은 토큰입니다." },

  // refreshToken err
  REFRESH_TOKEN_NOT_PROVIDED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "REFRESHTOKEN001", message: "refresh 토큰이 제공되지 않았습니다." },
  REFRESH_TOKEN_INVALID: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "REFRESHTOKEN002", message: "유효하지 않은 refresh 토큰입니다." },

  // find-id err
  FIND_ID_EMPTY_DATA: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "FINDID001", message: "데이터가 비어있습니다." },
  FIND_ID_USER_NOT_FOUND: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "FINDID002", message: "존재하지 않는 사용자입니다." },

  // auth-reset-password err
  AUTH_RESET_PASSWORD_EMPTY_DATA: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "AUTHRESETPASSWORD001", message: "데이터가 비어있습니다." },
  AUTH_RESET_PASSWORD_USER_NOT_FOUND: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "AUTHRESETPASSWORD002", message: "존재하지 않는 사용자입니다." },

  // set-reset-password err
  SET_RESET_PASSWORD_EMPTY_TOKEN: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "SETRESETPASSWORD001", message: "비밀번호 변경 권한 토큰이 존재하지 않습니다." },
  SET_RESET_PASSWORD_EMPTY_NEW_PASSWORD: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "SETRESETPASSWORD002", message: "변경할 비밀번호 데이터가 비어있습니다." },
  SET_RESET_PASSWORD_CHANGE_PASSWORD_ERROR: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "SETRESETPASSWORD003", message: "비밀번호 변경에 실패했습니다." },
  SET_RESET_PASSWORD_VERIFY_TOKEN_ERROR: { status: StatusCodes.NOT_ACCEPTABLE, isSuccess: false, code: "SETRESETPASSWORD004", message: "비밀번호 변경 권한 토큰이 유효하지 않습니다." },

  // myprofile-set err
  MYPROFILE_EMPTY_IMG: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "MYPROFILE001", message: "사용자 이미지가 존재하지 않습니다." },
  MYPROFILE_EMPTY_DATA: { status: StatusCodes.PAYMENT_REQUIRED, isSuccess: false, code: "MYPROFILE002", message: "기본 정보 또는 체형 정보 데이터가 없습니다." },
  MYPROFILE_EXIST_BODY_INFO: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "MYPROFILE003", message: "체형 정보 데이터가 존재합니다." },
  MYPROFILE_BODY_INFO_SAVE_ERROR:{ status: StatusCodes.NOT_FOUND, isSuccess: false, code: "MYPROFILE004", message: "체형 정보 데이터 저장 중 오류가 발생했습니다." },
  MYPROFILE_USER_INFO_SAVE_ERROR:{ status: StatusCodes.METHOD_NOT_ALLOWED, isSuccess: false, code: "MYPROFILE005", message: "기본 정보 데이터 저장 중 오류가 발생했습니다." },
  MYPROFILE_USER_IMG_SAVE_ERROR:{ status: StatusCodes.NOT_ACCEPTABLE, isSuccess: false, code: "MYPROFILE006", message: "사용자 이미지 데이터 저장 중 오류가 발생했습니다." },
  MYPROFILE_EXIST_USER_NICKNAME: { status: StatusCodes.PROXY_AUTHENTICATION_REQUIRED, isSuccess: false, code: "MYPROFILE007", message: "이미 존재하는 닉네임입니다." },
  MYPROFILE_UNAVAILABLE_FIT: { status: StatusCodes.REQUEST_TIMEOUT, isSuccess: false, code: "MYPROFILE008", message: "존재하지 않는 선호 핏입니다." },
  MYPROFILE_UNAVAILABLE_STYLE: { status: StatusCodes.CONFLICT, isSuccess: false, code: "MYPROFILE009", message: "존재하지 않는 선호 스타일입니다." },
  MYPROFILE_UNAVAILABLE_GENDER: { status: StatusCodes.GONE, isSuccess: false, code: "MYPROFILE010", message: "존재하지 않는 성별입니다." },
  MYPROFILE_PREFER_FIT_LENGHT_ERROR: { status: StatusCodes.LENGTH_REQUIRED, isSuccess: false, code: "MYPROFILE011", message: "선호 핏 개수를 다시 확인해주세요." },
  MYPROFILE_PREFER_STYLE_LENGHT_ERROR: { status: StatusCodes.PRECONDITION_FAILED, isSuccess: false, code: "MYPROFILE012", message: "선호 스타일 개수를 다시 확인해주세요." },
  MYPROFILE_NICKNAME_SET_ERROR: { status: StatusCodes.REQUEST_TOO_LONG, isSuccess: false, code: "MYPROFILE013", message: "닉네임을 다시 설정해주세요." },
};
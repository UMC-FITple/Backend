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
  USERID_ALREADY_EXIST: { status: StatusCodes.CONFLICT, isSuccess: false, code: "401", message: "이미 존재하는 아이디입니다." },
  EMPTY_DATA: { status: StatusCodes.CONFLICT, isSuccess: false, code: "402", message: "데이터가 비어있습니다." },
  SIGNUP_ERROR: { status: StatusCodes.CONFLICT, isSuccess: false, code: "403", message: "회원가입 에러" }, // 디테일하게 수정할 필요있음

  // login err
  USER_NOT_FOUND: { status: StatusCodes.CONFLICT, isSuccess: false, code: "401", message: "존재하지 않는 아이디입니다." },
  PASSWORD_MISMATCH: { status: StatusCodes.CONFLICT, isSuccess: false, code: "403", message: "비밀번호가 일치하지 않습니다." },

  // login middlewares err
  TOKEN_NOT_PROVIDED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "401", message: "로그인이 필요합니다." },
  TOKEN_EXPIRED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "403", message: "토큰을 재발급 받아주세요." },
  INVALID_TOKEN: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "403", message: "유효하지 않은 토큰입니다." },

};
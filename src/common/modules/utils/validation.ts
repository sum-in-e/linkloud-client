/**
 * 이메일 유효성 검사
 */
export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
};

/**
 * 비밀번호 유효성 검사 (영문, 숫자, 특수문자를 모두 포함하는 8~15자 조합의 정규식)
 */
export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[\da-zA-Z\W_]{8,15}$/;
  return regex.test(password);
};

/**
 * 닉네임 유효성 검사 (2~15자 조합의 정규식)
 */
export const isValidNickname = (nickname: string): boolean => {
  const regex = /^.{2,15}$/;
  return regex.test(nickname);
};

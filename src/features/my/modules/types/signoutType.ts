export const SIGN_OUT_REASON_TYPE = {
  NOT_HELPFUL: '저장한 글을 잊지 않고 보는 데에 도움이 되지 않아서',
  INCONVENIENT: '링크를 다시 찾아보는 게 번거로워서',
  HARD_TO_MANAGE: '링크를 관리하기 어려워서',
  LOW_ACCESSIBILITY: '접근성이 떨어져서',
  OTHERS: '기타',
} as const;

export type SignOutReasonType =
  (typeof SIGN_OUT_REASON_TYPE)[keyof typeof SIGN_OUT_REASON_TYPE];

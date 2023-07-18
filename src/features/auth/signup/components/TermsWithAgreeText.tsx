const TermsWithAgreeText = () => {
  return (
    <p className="whitespace-pre text-center text-xs text-gray-500">
      {`가입 진행은 `}
      <button
        type="button"
        className="w-fit text-xs text-gray-500 underline"
        onClick={() => window.open('https://www.craft.me/s/yG0eJS9FTPXVGh ')}
      >
        {`개인정보 수집 및 이용`}
      </button>
      {`과 `}
      <button
        type="button"
        className="w-fit text-xs text-gray-500 underline"
        onClick={() => window.open('https://www.craft.me/s/T6jZMsE55ZspAY')}
      >
        {`서비스 이용약관`}
      </button>
      {`에`}
      <br />
      {`동의하는 것을 의미합니다.`}
    </p>
  );
};

export default TermsWithAgreeText;

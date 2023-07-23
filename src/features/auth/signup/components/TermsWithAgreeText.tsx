const TermsWithAgreeText = () => {
  return (
    <p className="whitespace-pre text-center text-xs text-gray-500">
      {`회원가입 진행 시 `}
      <button
        type="button"
        className="w-fit text-xs text-gray-500 underline"
        onClick={() => window.open('https://www.craft.me/s/JpqZ4wRl0FqFWJ')}
      >
        {`개인정보 수집 및 이용`}
      </button>
      {`과 `}
      <button
        type="button"
        className="w-fit text-xs text-gray-500 underline"
        onClick={() => window.open('https://www.craft.me/s/u150oK9QGBnX4U')}
      >
        {`서비스 이용약관`}
      </button>
      {`에`}
      <br />
      {`동의하는 것으로 간주됩니다.`}
    </p>
  );
};

export default TermsWithAgreeText;

export interface SignupRequest {
  profileImage: string;
  nickname: string;
  idToken: string;
}

interface Token {
  idToken: string;
}

export const signup = async ({
  profileImage,
  nickname,
  idToken,
}: SignupRequest) => {
  const response = await fetch("/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ profileImage, nickname }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status} - ${await response.text()}`);
    throw new Error("회원가입 api 연동 필요");
  }

  if (response.ok) {
    console.log("signup - profileImage, nickname 보내기 성공");
  }

  console.log(response);

  return await response.json();
};

export const getUserInfo = async ({ idToken }: Token) => {
  console.log(idToken);

  const response = await fetch("/auth/login", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원정보 조회 실패");

    // 서버 연동 실패 시, 하드 코딩된 데이터 리턴
    return {
      nickname: "리액트",
      image_URL: "https://loremflickr.com/320/240?random=1",
    };

    throw new Error("로그인 api 연동 필요");
  }

  if (response.ok) {
    console.log("getUserInfo - profileImage, nickname 불러오기 성공");
    console.log(response);
  }

  return await response.json();
};

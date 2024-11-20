import { useState } from "react";
import { getToken, useAuthStore } from "../../store/authStore";
import { updateProfile } from "../../apis/updateProfile";

const MyPageEdit = () => {
  const { nickname, profileImageUrl, updateNickname, updateProfileImageUrl } =
    useAuthStore();
  const [newNickname, setNewNickname] = useState(nickname);

  const idToken = getToken();
  console.log(idToken);

  const handleNicknameChange = () => {
    if (newNickname.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    updateNickname(newNickname);

    // 회원정보 수정 API
    if (idToken) {
      updateProfile({ token: idToken, profileImageUrl: profileImageUrl, nickname: newNickname });
      alert("닉네임이 변경되었습니다.");
    } 
    };

  const handleProfileImageChange = (imageName: string) => {
    const targetImageURL = `https://my-vibrato-bucket.s3.ap-northeast-2.amazonaws.com/vibrato/${imageName}`
    updateProfileImageUrl(targetImageURL);

    // 회원정보 수정 API 
    if (idToken) {
      updateProfile({ token: idToken, profileImageUrl: targetImageURL, nickname: nickname });
      alert("프로필 이미지가 변경되었습니다.");
    } 
  };

  return (
    <div className="container mx-auto grid grid-cols-12 gap-10 px-5">
      {/* 프로필 섹션 */}
      <div className="col-span-12 flex items-center rounded-md p-5 justify-between">
        <div className="flex items-center space-x-8">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-40 h-40 rounded-full bg-light_coral border shadow-md"
          />
          <span className="text-2xl font-bold">{nickname} 님</span>
        </div>
      </div>

      <h2 className="col-span-12 text-2xl font-bold px-5 mr-40">
        개인정보 수정
      </h2>

      {/* 닉네임 변경 섹션 */}
      <div className="col-span-12 flex justify-between items-center">
        <h2 className="font-semibold text-xl px-5 mr-20">닉네임 변경</h2>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="닉네임 변경"
          className="border rounded-md flex-grow m-4 px-4 py-2 text-sm"
        />
        <button
          onClick={handleNicknameChange}
          className="bg-coral text-white rounded-md px-5 py-2 "
        >
          확인
        </button>
      </div>

      {/* 프로필 이미지 변경 섹션 */}
      <h2 className="col-span-12 font-semibold text-xl px-5 mr-20">
        프로필 이미지 변경
      </h2>
      <div className="col-span-12 flex flex-wrap justify-center items-center gap-6 px-10">
        {[
          'profileImage01.png',
          'profileImage02.png',
          'profileImage03.png',
          'profileImage04.png',
          'profileImage05.png',
          'profileImage06.png',
          'profileImage07.png',
          'profileImage08.png',
          'profileImage09.png',
          'profileImage10.png',
          'profileImage11.png',
          'profileImage12.png',
        ].map((imageName, index) => (
          <img
            key={index}
            src={`https://my-vibrato-bucket.s3.ap-northeast-2.amazonaws.com/vibrato/${imageName}`}
            alt={`Profile ${index + 1}`}
            className="w-40 h-40 rounded-full border bg-light_coral shadow-md cursor-pointer"
            onClick={() => handleProfileImageChange(imageName)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPageEdit;

import { useState } from "react";
import { getUserInfo, signup } from "../apis/login";
import Modal from "./Modal";
import { auth } from "../firebase"; // Firebase 초기화 파일
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const {
    isLoggedIn,
    nickname,
    profileImageUrl,
    storeLogin,
    storeLogout,
    updateNickname,
    updateProfileImageUrl,
  } = useAuthStore();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"login" | "signup" | "">("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupNickname, setSignupNickname] = useState<string>("");

  const navigate = useNavigate();

  const handleError = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "존재하지 않는 이메일입니다.";
      case "auth/wrong-password":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      case "auth/invalid-credential":
        return "이메일 혹은 비밀번호가 틀렸습니다.";
      default:
        return "로그인에 실패 하였습니다.";
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log(idToken);

      // 회원가입 : 기본 프로필 이미지 (profileImage01.png), 닉네임 전달
      await signup({
        profileImage:
          "https://my-vibrato-bucket.s3.ap-northeast-2.amazonaws.com/vibrato/profileImage01.png",
        nickname: signupNickname,
        idToken,
      });
      alert("회원가입이 완료되었습니다.");
      closeModal();
    } catch (error) {
      console.error("회원가입:", error);
      if (error instanceof FirebaseError) {
        alert("회원가입 실패: " + handleError(error));
      } else if (error == "Error: 회원가입 api 연동 필요") {
        alert(
          "회원가입 실패: Firebase에 유저 추가 완료, 하지만 회원가입 api 연동 필요"
        );
        closeModal();
      } else {
        alert("회원가입 실패: 알 수 없는 오류가 발생했습니다." + error);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 로그인 : 프로필 이미지 (aws S3 주소), 닉네임 불러오기
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); // 입력된 이메일과 비밀번호 사용
      const user = userCredential.user;
      // const uid = user.uid;
      const idToken = await user.getIdToken();
      console.log(idToken, "logined");

      // 헤더에 표시될 닉네임, 이미지 받아온 후 업데이트
      const userInfo = await getUserInfo({ idToken: idToken });
      updateNickname(userInfo.nickname);
      updateProfileImageUrl(userInfo.profileImage);

      // 로컬 스토리지에 저장할 토큰 생성
      const token = await user.getIdToken();
      storeLogin(token, userInfo.nickname, userInfo.profileImage);

      // alert("로그인 성공");
      closeModal();
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      if (error instanceof FirebaseError) {
        alert("회원 정보 조회 실패: " + handleError(error));
      } else if (error == "Error: 로그인 api 연동 필요") {
        alert(
          "로그인 실패: Firebase를 통한 로그인 완료, 하지만 로그인 api 연동 필요"
        );
      } else {
        alert("로그인 실패: 알 수 없는 오류가 발생했습니다." + error);
      }
    }
  };

  const handleLogout = () => {
    storeLogout();
    navigate(`/`);
  };

  const openModal = (type: "login" | "signup") => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalType === "login") {
      setEmail("");
      setPassword("");
    } else {
      setSignupEmail("");
      setSignupPassword("");
      setSignupNickname("");
    }
    setModalType("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center space-x-2 justify-end space-x-2 w-full">
          {/* 프로필 이미지 및 닉네임 */}
          <Link
            to="/MyPage"
            className="flex items-center overflow-hidden group"
          >
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full bg-light_coral border drop-shadow-md"
              />
            </div>

            {/* 닉네임과 "님" */}
            <div className="flex items-center space-x-1 flex-grow overflow-hidden ml-2">
              <span className="truncate font-bold text-gray_dark group-hover:text-coral">
                {nickname}
              </span>
              <span className="font-bold text-gray_dark group-hover:text-coral">
                님
              </span>
            </div>
          </Link>
          {/* 로그아웃 버튼 */}
          <button
            onClick={handleLogout}
            className="font-bold text-gray_dark hover:text-coral flex-shrink-0 ml-4"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex space-x-4 justify-end">
          <button
            onClick={() => openModal("login")}
            className="font-bold text-gray_dark hover:text-coral"
          >
            로그인
          </button>
          <button
            onClick={() => openModal("signup")}
            className="font-bold text-gray_dark hover:text-coral"
          >
            회원가입
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <Modal
            title={modalType === "login" ? "로그인" : "회원가입"}
            onClose={closeModal}
          >
            {modalType === "login" ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#c07777] text-white rounded hover:bg-[#af6363]"
                >
                  로그인
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="이메일"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="닉네임"
                  value={signupNickname}
                  onChange={(e) => setSignupNickname(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#c07777] text-white rounded hover:bg-[#af6363]"
                >
                  회원가입
                </button>
              </form>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Profile;

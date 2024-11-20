import { create } from "zustand";

interface StoreState {
  isLoggedIn: boolean;
  nickname: string;
  profileImageUrl: string;
  storeLogin: (token: string, nickname: string, imageURL: string) => void;
  storeLogout: () => void;
  updateNickname: (newNickname: string) => void;
  updateProfileImageUrl: (newProfileImageUrl: string) => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getNickname = () => {
  const nickname = localStorage.getItem("nickname");
  return nickname;
};

export const getImageURL = () => {
  const imageURL = localStorage.getItem("imageURL");
  return imageURL;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setNickname = (nickname: string) => {
  localStorage.setItem("nickname", nickname);
};

export const setImageURL = (imageURL: string) => {
  localStorage.setItem("imageURL", imageURL);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const removeNickname = () => {
  localStorage.removeItem("nickname");
};

export const removeImageURL = () => {
  localStorage.removeItem("imageURL");
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: getToken() ? true : false,
  nickname: getNickname() || "기본 닉네임",
  profileImageUrl: getImageURL() || "",

  storeLogin: (token: string, nickname: string, imageURL: string) => {
    set({ isLoggedIn: true });
    setToken(token);
    setNickname(nickname);
    setImageURL(imageURL);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
    removeNickname();
    removeImageURL();
  },
  updateNickname: (newNickname: string) => {
    set({ nickname: newNickname });
    setNickname(newNickname);
  },
  updateProfileImageUrl: (newProfileImageUrl: string) => {
    set({ profileImageUrl: newProfileImageUrl });
    setImageURL(newProfileImageUrl);
  },
}));

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
import { Container, Div } from "./MyPageStyles";
import { IoIosArrowBack } from "react-icons/io";
import { LoginContext } from "../../contexts/LoginContext";
import AxiosApi from "../../api/AxiosApi";

// 배너 이미지 매핑
import {
  bannerSrcPathDict,
  getBannerNameFromSrc,
} from "../../util/bannerImageUtils";

const ChangeImage = () => {
  const { updateDiarySetting } = useContext(DiarySettingContext);
  const { isDarkMode, loggedInMember } = useContext(LoginContext);
  const navigate = useNavigate();

  // 배너 이미지 목록을 bannerImageMap를 이용해서 동적으로 생성
  const images = Object.keys(bannerSrcPathDict).map((key) => ({
    src: bannerSrcPathDict[key],
    alt: key,
  }));

  const handleImageDoubleClick = async (src) => {
    const isUpdated = await updateDiarySetting(
      "mainBannerImage",
      getBannerNameFromSrc(src)
    );

    if (isUpdated) {
      alert("배너 이미지가 변경되었습니다.");
      updateDiarySetting(src);
      navigate("/");
    } else {
      alert("이미지를 변경하는 데 실패했습니다.");
    }
  };

  return (
    <Container>
      <Div
        className={isDarkMode ? "banner-container-dark" : "banner-container"}
      >
        <div className="banner-header">
          <button onClick={() => navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={() => navigate("/mypage")} className="mypage-title">
            배너
          </p>
        </div>

        <div className="banner-body">
          {images.map((image) => (
            <div
              key={image.alt}
              className="banner-box"
              onDoubleClick={() => handleImageDoubleClick(image.src)}
            >
              <img src={image.src} alt={image.alt} className="banner-image" />
            </div>
          ))}
        </div>
      </Div>
    </Container>
  );
};

export default ChangeImage;

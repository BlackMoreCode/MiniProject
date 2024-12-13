import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BannerImageContext } from "../../contexts/BannerImageContext";
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
  const { setBannerImage } = useContext(BannerImageContext);
  const { isDarkMode, loggedInMember } = useContext(LoginContext);
  const navigate = useNavigate();

  // 배너 이미지 목록을 bannerImageMap를 이용해서 동적으로 생성
  const images = Object.keys(bannerSrcPathDict).map((key) => ({
    src: bannerSrcPathDict[key],
    alt: key,
  }));

  const handleImageDoubleClick = async (src) => {
    const updatedDiarySetting = {
      mainBannerImage: getBannerNameFromSrc(src),
    };

    // 알려진 유효한 키들로 백엔드를 업데이트
    const updated = await AxiosApi.updateDiarySetting(
      loggedInMember,
      updatedDiarySetting
    );

    if (updated) {
      alert("이미지가 변경되었습니다.");
      setBannerImage(src);
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

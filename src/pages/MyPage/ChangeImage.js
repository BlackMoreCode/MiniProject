import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
// context
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
// css
import { Container, Div } from "./MyPageStyles";
// icon
import { IoIosArrowBack } from "react-icons/io";
// Modal
import MessageModal from "../../components/MessageModal";

// 배너 이미지 매핑
import {
  bannerSrcPathDict,
  getBannerNameFromSrc,
} from "../../util/bannerImageUtils";

const ChangeImage = () => {
  const { diarySetting, updateDiarySetting } = useContext(DiarySettingContext);
  const navigate = useNavigate();

  const modalRef = useRef();
  const openModal = (title, description) => {
    modalRef.current?.enable(title, description);
  };

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
      const bannerName = {
        banner1: "1번 배너",
        banner2: "2번 배너",
        banner3: "3번 배너",
        banner4: "4번 배너",
        default: "기본 배너",
      };
      openModal(
        "배너 설정",
        `${bannerName[getBannerNameFromSrc(src)]}로 설정되었습니다.`
      );
    } else {
      openModal(
        "배너 설정",
        "서버 통신 과정에서 문제가 발생했습니다. 관리자에게 문의해주세요.🥲"
      );
    }
  };

  // 폰트 설정
  const [userFont, setUserFont] = useState("default");
  useEffect(() => {
    if (diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if (diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if (diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if (diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("font-default");
    }
  }, [diarySetting.font]);

  return (
    <Container>
      <Div
        className={`${
          diarySetting.theme === "dark"
            ? "banner-container-dark"
            : "banner-container"
        } 
            ${userFont} 
        `}
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
              {diarySetting.mainBannerImage === image.alt && <span>✔</span>}
              <img src={image.src} alt={image.alt} className="banner-image" />
            </div>
          ))}
        </div>
      </Div>
      <MessageModal ref={modalRef} />
    </Container>
  );
};

export default ChangeImage;

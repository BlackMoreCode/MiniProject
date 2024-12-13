//ChangeImage에서 불러들였어도 보는 스코프가 다르고, prop으로 내려주지 않는한 혹은 공유된 컨텍스트 혹은 유틸리티 모듈로 처리하지 않는한
//변수 및 import가 공유가 되지 않기 때문에 여기서도 불러오고 매핑 처리가 필요합니다.
//그래서 여기에 공통 유틸리티 모듈로 작성합니다 :)
import image1 from "../assets/bannerimages/banner1.jpg";
import image2 from "../assets/bannerimages/banner2.jpg";
import image3 from "../assets/bannerimages/banner3.jpg";
import image4 from "../assets/bannerimages/banner4.jpg";
import image5 from "../assets/bannerimages/banner5.jpg";

export const bannerImageMap = {
  banner1: image1,
  banner2: image2,
  banner3: image3,
  banner4: image4,
  banner5: image5,
};

// 쉽게 찾기 위해서 이미지 객체로부터 배너키를 역 매핑 작성
export const imageToKeyMap = new Map(
  Object.entries(bannerImageMap).map(([key, value]) => [value, key])
);
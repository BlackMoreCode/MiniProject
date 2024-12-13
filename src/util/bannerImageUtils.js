//ChangeImage에서 불러들였어도 보는 스코프가 다르고, prop으로 내려주지 않는한 혹은 공유된 컨텍스트 혹은 유틸리티 모듈로 처리하지 않는한
//변수 및 import가 공유가 되지 않기 때문에 여기서도 불러오고 매핑 처리가 필요합니다.
//그래서 여기에 공통 유틸리티 모듈로 작성합니다 :)
import image1 from "../assets/bannerimages/banner1.jpg";
import image2 from "../assets/bannerimages/banner2.jpg";
import image3 from "../assets/bannerimages/banner3.jpg";
import image4 from "../assets/bannerimages/banner4.jpg";
import defaultImage from "../assets/bannerimages/banner5.jpg";

export const bannerSrcPathDict = {
  banner1: image1,
  banner2: image2,
  banner3: image3,
  banner4: image4,
  default: defaultImage,
};

// 쉽게 찾기 위해서 이미지 객체로부터 배너키를 역 매핑 작성
const swapKeyWithValue = new Map(
  Object.entries(bannerSrcPathDict).map(([key, value]) => [value, key])
);

// 이 함수는 이미지 src/소스가 주어졌을 때 대응하는 배너키를 찾아줍니다.
export function getBannerNameFromSrc(src) {
  // Src/소스 가 swapKeyWithValue의  값과 비교 대조됩니다
  for (const [imageObj, key] of swapKeyWithValue.entries()) {
    if (imageObj === src) {
      return key;
    }
  }
  return "default"; // 아무것도 찾지 못했다면 fallback 값은 default로로 설정
}

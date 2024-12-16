// 플래너 프론트와 백에서 날짜 타입 미스매치 안나게 하기 위해서 실험용으로 제작
// Calendar 페이지  내부 컴포넌트에 쓰일 것이며, 필요시 context에도 쓰일 수 있습니다.
// 백에서 Asia/Seoul, 그리고 데이터 문자열을 yyyy-MM-dd'T'HH:mm:ss 로 요구하니까 그에 맞추기.

export const formatToSeoulLocal = (date) => {
  const options = {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("sv-SE", options);
  const [
    { value: year },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
  ] = formatter.formatToParts(date);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

export function extractTimeOnly(date, withSeconds = true) {
  const index = date.lastIndexOf("T");

  // 'T' 이후의 문자열을 반환
  if (index !== -1) {
    const time = date.substring(index + 1);
    return withSeconds ? time : time.substring(0, 5);
  } else {
    return ""; // 'T'가 없으면 빈 문자열 반환
  }
}

// 캘린더 표기용 유틸 함수
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 시작과 끝 날짜들 사이의 날짜들을 생성하는 헬퍼 함수
 * 이를 통해서 이벤트의 날짜 범위 내에서 매 요일의 Date 객체 배열을 생성.
 * @param {Date} start
 * @param {Date} end
 * @returns {Date[]}
 */
export const getDateRange = (start, end) => {
  const dates = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0); // 자정으로 세팅
  end = new Date(end);
  end.setHours(0, 0, 0, 0); // 자정으로 세팅

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

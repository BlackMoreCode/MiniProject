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
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IntroContents } from "./IntroStyles";
import logoIcon from "../../assets/icons/logo.png";
import introPageWomanImage from "../../assets/images/intro-page-woman.png";
import introPageManImage from "../../assets/images/intro-page-man.png";
import { LoginContext } from "../../contexts/LoginContext";


const Intro = () => {
  const context = useContext(LoginContext);
  const { userId, userPassword } = context;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId, userPassword)
    if (userId && userPassword) {
      navigate("/");
    }
  }, [userId, userPassword])

  return (
    <IntroContents>
      <header>
        <img src={logoIcon} alt="CODELOG 로고" />
      </header>
      <main>
        <section>
          <div>
            <img src={introPageWomanImage} alt="" />
            <div>
              <p>"이 코드... 뭐였더라?"</p>
            </div>
          </div>
          <div>
            <p>코드로그에서 오늘의 코딩일기를</p>
            <p>기록해보세요!</p>
          </div>
        </section>
        <section>
          <div>
            <div>
              <p>"프로젝트 일정이</p>
              <p>어떻게 됐었지?"</p>
            </div>
            <img src={introPageManImage} alt="" />
          </div>
          <div>
            <p>코드로그에서 프로젝트 일정을</p>
            <p>관리해보세요!</p>
          </div>
        </section>
        <section>
          <div>
            <p>성장하는 개발자를 위한</p>
            <p>나만의 다이어리, 코드로그</p>
          </div>
        </section>
        <nav>
          <div>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        </nav>
      </main>
    </IntroContents>
  );
};

export default Intro;

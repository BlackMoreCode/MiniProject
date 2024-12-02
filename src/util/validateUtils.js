import AxiosApi from "../api/AxiosApi";

class SignUpFormValidator {
  #SIGNUP_FEEDBACK_MESSAGES = {
    idDuplicate: "이미 사용 중인 아이디입니다.",
    emailDuplicate: "이미 사용 중인 이메일입니다.",
    nicknameDuplicate: "이미 사용 중인 닉네임입니다.",
    idInvalidFormat:
      "아이디는 영문자, 숫자, 언더스코어(_), 하이픈(-)만 포함할 수 있습니다.",
    passwordInvalidFormat:
      "비밀번호는 영문자, 숫자, 그리고 !@#$%^&*() 특수문자만 포함할 수 있습니다.",
    emailInvalidFormat: "올바른 이메일 형식이 아닙니다.",
    passwordTooShort: "비밀번호는 최소 8자 이상이어야 합니다.",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    validationError: "입력 값의 유효성을 확인할 수 없습니다.",
    empty: "",
  };

  // ID는 영문자, 숫자, 언더스코어(_), 하이픈(-)만 포함하며, 최소 하나 이상의 문자
  #idRegex = /^[A-Za-z0-9_-]+$/;

  // PASSWORD는 영문자, 숫자, !@#$%^&*() 특수문자만 포함하며, 최소 8자 이상
  #passwordRegex = /^[A-Za-z0-9!@#$%^&*()]+$/;

  // EMAIL은 일반적인 이메일 형식을 따르며, 영문자, 숫자, 특정 특수문자만 포함
  #emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  #validatePasswordLength(value, setFormMessages) {
    if (value && value.length < 8) {
      setFormMessages((prevState) => ({
        ...prevState,
        password: this.#SIGNUP_FEEDBACK_MESSAGES.passwordTooShort,
      }));
    } else {
      setFormMessages((prevState) => ({
        ...prevState,
        password: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
      }));
    }
  }

  #validatePasswordMismatch(values, setFormMessages) {
    if (!values.passwordConfirm || values.passwordConfirm === values.password) {
      setFormMessages((prevState) => ({
        ...prevState,
        passwordConfirm: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
      }));
    } else {
      setFormMessages((prevState) => ({
        ...prevState,
        passwordConfirm: this.#SIGNUP_FEEDBACK_MESSAGES.passwordMismatch,
      }));
    }
  }

  #validateIdFormat(value, setFormMessages) {
    if (value && !this.#idRegex.test(value)) {
      setFormMessages((prevState) => ({
        ...prevState,
        id: this.#SIGNUP_FEEDBACK_MESSAGES.idInvalidFormat,
      }));
      return true;
    } else {
      setFormMessages((prevState) => ({
        ...prevState,
        id: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
      }));
      return false;
    }
  }

  #validatePasswordFormat(value, setFormMessages) {
    if (value && !this.#passwordRegex.test(value)) {
      setFormMessages((prevState) => ({
        ...prevState,
        password: this.#SIGNUP_FEEDBACK_MESSAGES.passwordInvalidFormat,
      }));
      return true;
    } else {
      setFormMessages((prevState) => ({
        ...prevState,
        password: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
      }));
      return false;
    }
  }

  #validateEmailFormat(value, setFormMessages) {
    if (value && !this.#emailRegex.test(value)) {
      setFormMessages((prevState) => ({
        ...prevState,
        email: this.#SIGNUP_FEEDBACK_MESSAGES.emailInvalidFormat,
      }));
      return true;
    } else {
      setFormMessages((prevState) => ({
        ...prevState,
        email: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
      }));
      return false;
    }
  }

  async #validateUniqueFields(name, value, setFormMessages) {
    if (!value) {
      setFormMessages((prevState) => ({
        ...prevState,
        [name]: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
      }));
      return;
    }

    const isUnique = await AxiosApi.checkUnique(name, value);
    if (isUnique === null) {
      setFormMessages((prevState) => ({
        ...prevState,
        [name]: this.#SIGNUP_FEEDBACK_MESSAGES.validationError,
      }));
    } else {
      if (isUnique) {
        setFormMessages((prevState) => ({
          ...prevState,
          [name]: this.#SIGNUP_FEEDBACK_MESSAGES.empty,
        }));
      } else {
        setFormMessages((prevState) => ({
          ...prevState,
          [name]: this.#SIGNUP_FEEDBACK_MESSAGES[name + "Duplicate"],
        }));
      }
    }
  }

  async validateSignUpForm(name, values, setFormMessages) {
    switch (name) {
      case "id":
        if (!this.#validateIdFormat(values.id, setFormMessages))
          await this.#validateUniqueFields("id", values.id, setFormMessages);
        break;
      case "password":
        if (!this.#validatePasswordFormat(values.password, setFormMessages))
          this.#validatePasswordLength(values.password, setFormMessages);
        this.#validatePasswordMismatch(values, setFormMessages);
        break;
      case "passwordConfirm":
        this.#validatePasswordMismatch(values, setFormMessages);
        break;
      case "email":
        if (!this.#validateEmailFormat(values.email, setFormMessages))
          await this.#validateUniqueFields(
            "email",
            values.email,
            setFormMessages
          );
        break;
      case "nickname":
        await this.#validateUniqueFields(
          "nickname",
          values.nickname,
          setFormMessages
        );
        break;
      default:
        console.error("input에 할당된 name 속성이 유효하지 않습니다.");
        return;
    }
  }
}

const signUpFormValidator = new SignUpFormValidator();
export const validateSignUpForm =
  signUpFormValidator.validateSignUpForm.bind(signUpFormValidator);

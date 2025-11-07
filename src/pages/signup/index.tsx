import Input from "@/components/input/index";
import * as S from "@/pages/signup/style";
import Button from "@/components/button";
import { useCallback, useEffect, useState } from "react";
import { useSignup } from "@/apis/admin";
import { useNavigate, useLocation } from "react-router-dom";
import { EmailInput } from "@/components/input/email";
import Dropdown from "@/components/dropdown/dropdown";
import { saveToken } from "@/utils/auth";
import { useEmailAuth, useEmailCheck } from "@/apis/mail";
import { useSignupStore } from "@/stores/useSignup";

const PW_REGEX =
  /^(?=\S+$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/;

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const { mutate: signup } = useSignup();
  const { mutate: emailAuth, isPending: isSending } = useEmailAuth();
  const { mutate: checkEmailCode } = useEmailCheck();
  const [disabled, setDisabled] = useState<boolean>(true);

  const {
    form,
    errors,
    ui,
    setForm,
    setError,
    clearError,
    setUI,
    resetErrors,
  } = useSignupStore();

  const handleDisabled = () => {
    if (path === "/signup") {
      return !form.secretKey.trim();
    }

    if (path === "/signup/email") {
      return !form.email.trim() || !form.code.trim() || !ui.isEmailLocked;
    }

    if (path === "/signup/password") {
      return (
        !form.password.trim() ||
        !form.passwordCheck.trim() ||
        !!errors.password ||
        !!errors.passwordCheck
      );
    }

    if (path === "/signup/info") {
      if (form.isHomeroom) {
        return (
          !form.name.trim() ||
          form.grade === 0 ||
          form.classNum === 0 ||
          !!errors.name
        );
      }
      return !form.name.trim() || !!errors.name;
    }

    return true;
  };

  useEffect(() => {
    setDisabled(handleDisabled());
  }, [path, form, errors, ui]);

  const handleVerifyCode = () => {
    if (!form.email || !form.code) {
      setError("code", "이메일과 인증 코드를 모두 입력해주세요.");
      return;
    }

    checkEmailCode(
      { email: form.email, code: form.code },
      {
        onSuccess: (data: boolean) => {
          if (data) {
            clearError("code");
            setUI("isEmailLocked", true);
          } else {
            setError("code", "인증 코드가 올바르지 않습니다.");
          }
        },
        onError: () => {
          setError("code", "인증 코드가 올바르지 않습니다.");
        },
      }
    );
  };

  const handleMailBtn = useCallback(() => {
    if (!form.email || isSending) return;

    emailAuth(
      { mail: form.email, title: "PiCK 인증 코드", message: "이메일 인증" },
      {
        onError: (err: any) => {
          if (err?.response?.status === 409) {
            setError("email", "이미 가입된 이메일입니다.");
            return;
          }
          setError("email", "인증 메일 발송에 실패했습니다.");
        },
        onSuccess: () => {
          clearError("email");
          setUI("isSend", true);
        },
      }
    );
  }, [form.email, isSending, emailAuth, setError, clearError, setUI]);

  const onChangePassword = (val: string) => {
    setForm("password", val);

    if (!val || PW_REGEX.test(val)) {
      clearError("password");
    } else {
      setError(
        "password",
        "비밀번호는 8~30자, 영문/숫자/특수문자를 포함해야 합니다."
      );
    }

    if (form.passwordCheck && form.passwordCheck !== val) {
      setError("passwordCheck", "비밀번호가 일치하지 않습니다.");
    } else {
      clearError("passwordCheck");
    }
  };

  const onChangePasswordCheck = (val: string) => {
    setForm("passwordCheck", val);
    if (!val || form.password === val) {
      clearError("passwordCheck");
    } else {
      setError("passwordCheck", "비밀번호가 일치하지 않습니다.");
    }
  };

  const handleGradeChange = (value: string | number) => {
    setForm("grade", Number(value));
    if (errors.gradeClass) clearError("gradeClass");
  };

  const handleClassChange = (value: string | number) => {
    setForm("classNum", Number(value));
    if (errors.gradeClass) clearError("gradeClass");
  };

  const handleClickBtn = () => {
    if (path == "/signup") {
      navigate("/signup/email");
      setDisabled(true);
      return;
    } else if (path == "/signup/email") {
      navigate("/signup/password");
      setDisabled(true);
      return;
    } else if (path == "/signup/password") {
      navigate("/signup/info");
      setDisabled(true);
      return;
    }

    clearError("secretKey");
    clearError("code");
    resetErrors();

    const payload = {
      account_id: form.email,
      password: form.password,
      name: form.name.trim(),
      grade: form.isHomeroom ? Number(form.grade) : 0,
      class_num: form.isHomeroom ? Number(form.classNum) : 0,
      code: form.code.trim(),
      secret_key: form.secretKey.trim(),
      device_token: form.deviceToken,
    };

    signup(payload, {
      onSuccess: (res) => {
        saveToken(res.access_token, res.refresh_token);
        navigate("/main");
      },
      onError: (err: any) => {
        const code = err?.response?.data?.message;
        clearError("secretKey");
        clearError("code");
        clearError("global");
        if (code === "비밀 키가 일치하지 않습니다") {
          setError("secretKey", "시크릿키가 잘못되었습니다");
          navigate("/signup");
          setUI("isEmailLocked", false);
          return;
        }
        if (code === "만료된 이메일 인증 코드입니다") {
          setError("code", "인증코드가 만료되었습니다");
          setUI("isEmailLocked", false);
          navigate("/signup/email");
          return;
        }
        if (code === "중복된 사용자입니다") {
          setError("global", "중복된 사용자입니다");
          return;
        }
        if (
          code ===
          "이미 담당 선생님이 존재하는 학년,반입니다. 가까운 픽에 문의하세요"
        ) {
          setError("global", "이미 담당 선생님이 존재하는 학년,반입니다.");
          return;
        }
        setError("global", "회원가입에 실패했습니다.");
      },
    });
  };

  const renderStep = () => {
    if (path === "/signup")
      return (
        <>
          <S.SectionWrap>
            <Input
              label="시크릿 키"
              placeholder="PiCK Admin의 시크릿 키를 입력해주세요."
              value={form.secretKey}
              name="secret_key"
              onChange={(e) => {
                setForm("secretKey", e.target.value);
                if (errors.secretKey) clearError("secretKey");
              }}
              type="text"
            />
            {errors.secretKey && <S.Error>{errors.secretKey}</S.Error>}
          </S.SectionWrap>
        </>
      );

    if (path === "/signup/email")
      return (
        <>
          <S.SectionWrap>
            <EmailInput
              label="이메일"
              onChange={(value) => {
                setForm("email", value);
                if (errors.email) clearError("email");
              }}
              onButtonClick={handleMailBtn}
              disabled={ui.isEmailLocked}
              mainText="발송"
              subText="재발송"
              domain="dsm.hs.kr"
              placeholder="학교 이메일을 입력해주세요"
            />
            {errors.email && <S.Error>{errors.email}</S.Error>}
          </S.SectionWrap>

          <S.SectionWrap>
            <EmailInput
              label="인증 코드"
              onChange={(value) => {
                setForm("code", value);
                if (errors.code) clearError("code");
              }}
              onButtonClick={handleVerifyCode}
              disabled={ui.isEmailLocked}
              mainText="확인"
              subText="확인"
              domain=""
              placeholder="인증 코드를 입력해주세요"
            />
            {errors.code && <S.Error>{errors.code}</S.Error>}
          </S.SectionWrap>
        </>
      );

    if (path === "/signup/password")
      return (
        <>
          <S.SectionWrap>
            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              value={form.password}
              name="password"
              onChange={(e) => onChangePassword(e.target.value)}
              type="password"
              error={!!errors.password}
            />
            {errors.password && <S.Error>{errors.password}</S.Error>}
          </S.SectionWrap>

          <S.SectionWrap>
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 확인해주세요"
              value={form.passwordCheck}
              name="password_check"
              onChange={(e) => onChangePasswordCheck(e.target.value)}
              type="password"
              error={!!errors.passwordCheck}
            />
            {errors.passwordCheck && <S.Error>{errors.passwordCheck}</S.Error>}
          </S.SectionWrap>
        </>
      );

    if (path === "/signup/info")
      return (
        <>
          <S.AlignStart>
            <S.Column10>
              <S.CheckboxContainer>
                <S.CheckboxRow>담임 선생님이신가요?</S.CheckboxRow>
                <S.CheckboxInput
                  type="checkbox"
                  checked={form.isHomeroom}
                  onChange={(e) => setForm("isHomeroom", e.target.checked)}
                />
              </S.CheckboxContainer>

              {form.isHomeroom && (
                <>
                  <S.DropdownRow>
                    <Dropdown
                      options={[
                        { label: "1학년", value: 1 },
                        { label: "2학년", value: 2 },
                        { label: "3학년", value: 3 },
                      ]}
                      value={form.grade}
                      changeHandler={handleGradeChange}
                    />
                    <Dropdown
                      options={[
                        { label: "1반", value: 1 },
                        { label: "2반", value: 2 },
                        { label: "3반", value: 3 },
                        { label: "4반", value: 4 },
                      ]}
                      value={form.classNum}
                      changeHandler={handleClassChange}
                    />
                  </S.DropdownRow>
                  {errors.gradeClass && <S.Error>{errors.gradeClass}</S.Error>}
                </>
              )}
            </S.Column10>
          </S.AlignStart>

          <S.SectionWrap>
            <Input
              label="이름"
              placeholder="이름을 입력해주세요"
              value={form.name}
              name="name"
              onChange={(e) => {
                setForm("name", e.target.value);
                if (errors.name) clearError("name");
              }}
              type="text"
            />
            {errors.name && <S.Error>{errors.name}</S.Error>}
          </S.SectionWrap>
          {errors.global && <S.Error>{errors.global}</S.Error>}
        </>
      );
  };

  return (
    <S.SignupWrap>
      <S.SignupText>
        <S.PiCKText>PiCK</S.PiCKText>에 회원가입하기
      </S.SignupText>

      <S.ContentWrap>{renderStep()}</S.ContentWrap>

      <S.FixedButtonWrap>
        <Button width="100%" onClick={handleClickBtn} disabled={disabled}>
          {path == "/signup/info" ? "회원가입" : "다음"}
        </Button>
      </S.FixedButtonWrap>
    </S.SignupWrap>
  );
};

export default Signup;

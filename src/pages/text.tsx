import Button from "@/components/button/button";
import Input from "@/components/input";
import { useState } from "react";

const Test = () => {
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <Input
        onChange={handlePasswordChange}
        type="text"
        placeholder="아이디를 입력해주세요"
        label="아이디"
        name=""
        value={password}
      />
      <Input
        onChange={handlePasswordChange}
        type="password"
        placeholder="아이디를 입력해주세요"
        label="아이디"
        name=""
        value={password}
      />
      <Button width="100%" onClick={() => {}}>
        로그인
      </Button>
    </div>
  );
};

export default Test;

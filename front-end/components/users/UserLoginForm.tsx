import UserService from "../../services/UserService";
import { StatusMessage, User } from "../../types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginStyles from "../../styles/Login.module.css";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [emailError, setEmailError] = useState<String | null>(null);
  const [passwordError, setPasswordError] = useState<String | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!email && email.trim() === "") {
      setEmailError("Email cannot be empty");
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError("Password cannot be empty");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }
    const newEmail = email.trim().toLowerCase();
    const user = { email: newEmail, password };
    const response = await UserService.loginUser(user);

    if (response.status === 200) {
      setStatusMessages([
        {
          message: "Login Success",
          type: "success",
        },
      ]);

      const user = await response.json();
        const profile = await UserService.getUserByEmail(user.email, user.token);
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: user.token,
            email: user.email,
            username: user.username,
            role: user.role,
            firstName: profile.firstName,
            lastName: profile.lastName,
            workouts: profile.workouts,
            achievements: profile.achievements,
            
          })
        );
      
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: "Login Failed",
          type: "error",
        },
      ]);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={LoginStyles.page}>
        <h3 className={LoginStyles.title} data-testid="login-title">
          Log In
        </h3>

        {statusMessages.length > 0 && statusMessages[0].type === "success" && (
          <p className={LoginStyles.success} data-testid="success-message">
            {statusMessages[0].message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className={LoginStyles.form}
          data-testid="login-form"
        >
          <label
            htmlFor="emailInput"
            className={LoginStyles.field}
            data-testid="email-label"
          >
            Email
          </label>
          <div className={LoginStyles.input}>
            <input
              id="emailInput"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={LoginStyles.inputText}
              data-testid="email-input"
            />
          </div>

          <label
            htmlFor="passwordInput"
            className={LoginStyles.field}
            data-testid="password-label"
          >
            Password
          </label>
          <div className={LoginStyles.input}>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={LoginStyles.inputText}
              data-testid="password-input"
            />
            {(passwordError || emailError) && (
              <div className={LoginStyles.error} data-testid="error-message">
                {passwordError || emailError}
              </div>
            )}
            {statusMessages.length > 0 &&
              statusMessages[0].type === "error" && (
                <p className={LoginStyles.error} data-testid="error-message">
                  {statusMessages[0].message}
                </p>
              )}
          </div>
          <button
            type="submit"
            className={LoginStyles.submit}
            data-testid="submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLoginForm;

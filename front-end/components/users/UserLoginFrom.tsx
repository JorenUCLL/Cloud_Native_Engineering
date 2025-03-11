import UserService from "../../services/UserService";
import { StatusMessage, User } from "../../types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginStyles from "../../styles/Login.module.css";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation();

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
      setEmailError(t("login.incorrect"));
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError(t("login.incorrect"));
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
          message: t("login.success"),
          type: "success",
        },
      ]);

      const user = await response.json();

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: user.token,
          email: user.email,
          username: user.username,
          role: user.role,
          numPosts: user.numPosts,
        })
      );
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: t("login.incorrect"),
          type: "error",
        },
      ]);
    }
  };

  useEffect(() => {
    setUsers([
      {
        name: "Joren",
        email: "Joren.VanLaer@gmail.com",
        password: "Joren123",
        role: "user",
      },
      {
        name: "Nathan",
        email: "Nathan.DeKlerck@gmail.com",
        password: "Nathan123",
        role: "user",
      },
      {
        name: "Alexandre",
        email: "Alexandre.VanAerschot@gmail.com",
        password: "Alexandre123",
        role: "VIP",
      },
      {
        name: "Johan",
        email: "Johan.Pieck@gmail.com",
        password: "Johan123",
        role: "admin",
      },
    ]);
  }, []);

  return (
    <>
      <div className={LoginStyles.page}>
        <h3 className={LoginStyles.title} data-testid="login-title">
          {t("login.title")}
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
            {t("login.email")}
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
            {t("login.password")}
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
            {t("login.submit")}
          </button>
        </form>
      </div>
      <table className={LoginStyles.table} data-testid="user-table">
        <thead className={LoginStyles.tableHead}>
          <tr className={LoginStyles.tableHead}>
            <th
              className={LoginStyles.tableHead}
              scope="col"
              data-testid="table-name-header"
            >
              Name
            </th>
            <th
              className={LoginStyles.tableHead}
              scope="col"
              data-testid="table-email-header"
            >
              Email
            </th>
            <th
              className={LoginStyles.tableHead}
              scope="col"
              data-testid="table-password-header"
            >
              Password
            </th>
            <th
              className={LoginStyles.tableHead}
              scope="col"
              data-testid="table-role-header"
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody data-testid="user-table-body">
          {users.map((user, index) => (
            <tr
              className={LoginStyles.tr}
              key={index}
              onClick={() => {
                setSelectedUser(user);
              }}
              role="button"
              data-testid={`user-row-${index}`}
            >
              <td className={LoginStyles.td} data-testid={`user-name-${index}`}>
                {user.name}
              </td>
              <td
                className={LoginStyles.td}
                data-testid={`user-email-${index}`}
              >
                {user.email}
              </td>
              <td
                className={LoginStyles.td}
                data-testid={`user-password-${index}`}
              >
                {user.password}
              </td>
              <td className={LoginStyles.td} data-testid={`user-role-${index}`}>
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserLoginForm;

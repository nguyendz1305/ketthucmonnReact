import React, { useState } from "react";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset lỗi trước khi kiểm tra
    setError("");

    // Kiểm tra nếu tên đăng nhập và mật khẩu không rỗng
    if (!username || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu!"); // Nếu thiếu tên đăng nhập hoặc mật khẩu
    } else {
      onLoginSuccess(); // Gọi hàm onLoginSuccess khi đăng nhập thành công
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Đăng Nhập</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Tên Đăng Nhập</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập của bạn"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật Khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;

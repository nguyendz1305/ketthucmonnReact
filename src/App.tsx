import React, { useState } from "react";
import Weather from "./components/Weather";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Hàm xử lý khi người dùng đăng nhập thành công
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Weather />
      )}
    </div>
  );
}

export default App;

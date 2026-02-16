import { useState } from "react";
import svgPaths from "./svg-1wvmm2m15t";
import img27 from "figma:asset/d606819b9d8f888e9de6825f8642b9ab5cc7023b.png";
import imgFarmer2 from "figma:asset/e0ad962b97c9adac7c75cb78fd6b52deee1e0236.png";

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);


const [isDarkMode, setIsDarkMode] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    // Mock login - In a real app, this would call an API
    console.log("Login attempt:", { username, password });
    
    // Navigate to dashboard
    onLogin();
  };

  const handleClearAll = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#e0e0e0] w-screen h-screen flex items-center justify-center" data-name="Login">
      <div className="absolute bg-white h-[800px] left-[258px] rounded-[30px] top-0 w-[934px]" />
      <div className="absolute bg-[#77b254] h-[752px] left-[720px] rounded-[22px] top-[28px] w-[460px]" data-name="image" />
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[normal] left-[335px] not-italic text-[#282828] text-[35px] text-nowrap top-[198px] whitespace-pre">Log In</p>
      <div className="absolute left-[720px] size-[460px] top-[-54px]" data-name="27">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img27} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img27} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img27} />
        </div>
      </div>
      <div className="absolute bg-[#77b254] h-[40px] left-[336px] rounded-[10px] top-[478px] w-[320px]" />
      <div className="absolute border-2 border-[#282828] border-solid h-[40px] left-[336px] rounded-[10px] top-[527px] w-[320px]" />
      <p className="absolute font-['Poppins:Regular',sans-serif] h-[24px] leading-[normal] left-[341px] not-italic text-[16px] text-[rgba(0, 0, 0, 0.5)] top-[363px] w-[77px]">Password</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[341px] not-italic text-[16px] text-[rgba(0, 0, 0, 0.5)] text-nowrap top-[289px] whitespace-pre">User Name</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="absolute bg-[#f0f0f0] border border-[rgba(0, 0, 0, 0.2)] border-solid h-[40px] left-[335px] rounded-[10px] top-[313px] w-[320px] px-4 font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254] focus:border-2 transition-colors"
      />
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[40px] left-[336px] rounded-[10px] top-[387px] w-[320px] px-4 font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254] focus:border-2 transition-colors"
      />
      {error && (
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[336px] not-italic text-[14px] text-[#dc2626] top-[433px]">
          {error}
        </p>
      )}
 <button
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={handleLogin}
    className="absolute h-[40px] left-[336px] rounded-[10px] top-[478px] w-[320px] transition-colors duration-200 cursor-pointer"
    style={{
        backgroundColor: isHovered 
            ? (isDarkMode ? "#7dbb5a" : "#73a855ff") // Hover colors
            : (isDarkMode ? "#6a9f4b" : "#3f5e2dff") // Normal colors
    }}
>
    <p className="text-white font-['Poppins:Medium',sans-serif] text-[16px]">
        Login
    </p>
</button>
      <button
        onClick={handleClearAll}
        className="absolute border-2 border-[#282828] border-solid h-[40px] left-[336px] rounded-[10px] top-[527px] w-[320px] hover:bg-[#f5f5f5] active:bg-[#e5e5e5] transition-colors cursor-pointer"
      >
        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#282828] text-[16px]">Clear All</p>
      </button>
      <div className="absolute left-[726px] size-[447px] top-[211px]" data-name="farmer 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFarmer2} />
      </div>
      <div className="absolute font-['Poppins:Bold',sans-serif] leading-[normal] left-[939.5px] not-italic text-[#f9f9f9] text-[16px] text-center text-nowrap top-[640px] translate-x-[-50%] whitespace-pre">
        <p className="mb-0">{`Cultivate the farmer inside YOU, `}</p>
        <p>and enjoy your Dream Harvest!</p>
      </div>
      <div className="absolute left-[626px] size-[19px] top-[323px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
          <path d={svgPaths.p1a7a7780} fill="var(--fill-0, #282828)" fillOpacity="0.5" id="Vector" />
        </svg>
      </div>
      <div 
        onClick={togglePasswordVisibility}
        className="absolute h-[19px] left-[626px] top-[400px] w-[19.092px] cursor-pointer hover:opacity-70 transition-opacity" 
        data-name="Layer 2"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
          <g id="eye-off-2">
            <path d="M19.0924 0H0V19H19.0924V0Z" fill="var(--fill-0, #282828)" fillOpacity="0.5" id="Vector" opacity="0" />
            <path d={svgPaths.p2ef11e00} fill="var(--fill-0, #282828)" fillOpacity="0.5" id="Vector_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
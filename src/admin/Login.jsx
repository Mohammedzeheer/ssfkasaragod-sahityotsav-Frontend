import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

    const handleLogin = (e) => {
    e.preventDefault();
    const validUsername = "zaheer"; 
    const validPassword = "zaheer123"; 

    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      if (username === validUsername && password === validPassword) {
        localStorage.setItem("isAdminLoggedIn", true);
        navigate("/admin");
      } else {
        setErrorMessage("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{errorMessage}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Sahityotsav admin login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Eye, EyeOff, User, Lock, Shield } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//     const handleLogin = (e) => {
//     e.preventDefault();
//     const validUsername = "zaheer"; 
//     const validPassword = "zaheer123"; 

//     setIsLoading(true);
//     setErrorMessage("");

//     setTimeout(() => {
//       if (username === validUsername && password === validPassword) {
//         localStorage.setItem("isAdminLoggedIn", true);
//         navigate("/admin");
//       } else {
//         setErrorMessage("Invalid credentials");
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-3 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative w-full max-w-md">
//         {/* Glassmorphism card */}
//         <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4 shadow-lg">
//               <Shield className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
//             <p className="text-white/70">Welcome back! Please sign in to continue</p>
//           </div>

//           <div onSubmit={handleLogin} className="space-y-6">
//             {/* Username Field */}
//             <div className="space-y-2">
//               <label htmlFor="username" className="text-sm font-medium text-white/90">
//                 Username
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
//                 <input
//                   id="username"
//                   type="text"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-purple-800/80 border border-purple-600/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label htmlFor="password" className="text-sm font-medium text-white/90">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-12 pr-12 py-3 bg-purple-800/80 border border-purple-600/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 backdrop-blur-sm">
//                 <p className="text-red-200 text-sm text-center">{errorMessage}</p>
//               </div>
//             )}

//             {/* Login Button */}
//             <button
//               onClick={handleLogin}
//               disabled={isLoading}
//               className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                   Signing in...
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="mt-6 text-center">
//             <p className="text-xs text-white/50">
//               Secure admin access • Protected by encryption
//             </p>
//           </div>
//         </div>

//         {/* Floating elements */}
//         <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// // src/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const validUsername = "zaheer"; 
//     const validPassword = "zaheer123"; 

//     setIsLoading(true);
//     setErrorMessage("");

//     setTimeout(() => {
//       if (username === validUsername && password === validPassword) {
//         localStorage.setItem("isAdminLoggedIn", true);
//         navigate("/admin");
//       } else {
//         setErrorMessage("Invalid credentials");
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
//           <p className="text-sm text-gray-600">Please sign in to your account</p>
//         </div>
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label htmlFor="username" className="text-sm font-semibold text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="text-sm font-semibold text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//             />
//           </div>
//           {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//           <button
//             type="submit"
//             className="w-full flex justify-center bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 ease-in-out"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

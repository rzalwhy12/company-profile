// // src/components/AuthForm.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// // Import fungsi Server Action
// import { loginUser, signupUser } from '@/actions/auth';

// import { Eye, EyeOff, Lock, Mail, User, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// interface AuthFormProps {
//     mode: 'login' | 'signup';
//     onToggleMode: () => void;
// }

// export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     // Inisialisasi errors sebagai objek kosong dan gunakan tipe Record<string, string>
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const [apiMessage, setApiMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
//     const [passwordStrength, setPasswordStrength] = useState(0);

//     const validateEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const calculatePasswordStrength = (password: string) => {
//         let strength = 0;
//         if (password.length >= 8) strength += 1;
//         if (/[A-Z]/.test(password)) strength += 1;
//         if (/[a-z]/.test(password)) strength += 1;
//         if (/[0-9]/.test(password)) strength += 1;
//         if (/[^A-Za-z0-9]/.test(password)) strength += 1;
//         return strength;
//     };

//     useEffect(() => {
//         if (formData.password) {
//             setPasswordStrength(calculatePasswordStrength(formData.password));
//         } else {
//             setPasswordStrength(0); // Reset strength if password is empty
//         }
//     }, [formData.password]);

//     // Reset form data, errors, dan apiMessage saat mode berubah
//     useEffect(() => {
//         setFormData({ username: '', email: '', password: '' });
//         setErrors({});
//         setApiMessage(null);
//     }, [mode]);


//     const validateForm = () => {
//         const newErrors: Record<string, string> = {};

//         // Gunakan .trim() untuk validasi di sisi klien
//         if (!formData.username.trim()) {
//             newErrors.username = 'Username is required';
//         } else if (formData.username.trim().length < 3) {
//             newErrors.username = 'Username must be at least 3 characters';
//         }

//         if (mode === 'signup') {
//             if (!formData.email.trim()) {
//                 newErrors.email = 'Email is required';
//             } else if (!validateEmail(formData.email.trim())) {
//                 newErrors.email = 'Please enter a valid email address';
//             }
//         }

//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 6) { // Biarkan length tanpa trim untuk password
//             newErrors.password = 'Password must be at least 6 characters';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             // Jika validasi form gagal, scroll ke elemen error pertama jika ada
//             const firstErrorField = Object.keys(errors)[0];
//             if (firstErrorField) {
//                 document.getElementById(firstErrorField)?.focus(); // Asumsi input memiliki id yang sesuai
//             }
//             return;
//         }

//         setLoading(true);
//         setApiMessage(null); // Clear previous messages

//         const dataToSend = new FormData();
//         // Penting: Server Actions sudah menerapkan .trim(), tapi di sini juga bisa membantu
//         dataToSend.append('username', formData.username.trim());
//         dataToSend.append('password', formData.password); // Password tidak perlu trim karena spasi bisa jadi bagian password
//         if (mode === 'signup') {
//             dataToSend.append('email', formData.email.trim());
//         }

//         try {
//             let result: { success?: boolean; message?: string; error?: string } | undefined;

//             if (mode === 'login') {
//                 result = await loginUser(dataToSend);
//                 // Jika loginUser berhasil, ia akan melakukan redirect,
//                 // sehingga kode setelah ini tidak akan dieksekusi jika berhasil.
//                 // Jika ada error, result.error akan berisi pesan.
//             } else { // mode === 'signup'
//                 result = await signupUser(dataToSend);
//             }

//             if (result?.error) {
//                 setApiMessage({ type: 'error', text: result.error });
//             } else if (result?.success) {
//                 setApiMessage({ type: 'success', text: result.message || "Operation successful!" });

//                 if (mode === 'signup') {
//                     // Memberi waktu user untuk melihat pesan sukses sebelum beralih mode
//                     setTimeout(() => {
//                         onToggleMode(); // Beralih ke mode login
//                         setFormData({ username: '', email: '', password: '' }); // Reset form
//                         setApiMessage(null); // Hapus pesan API setelah beralih mode
//                     }, 2000); // Tampilkan pesan selama 2 detik
//                 }
//                 // Jika mode login dan berhasil, redirect akan terjadi di Server Action, jadi tidak perlu di sini.
//             }

//         } catch (error) {
//             // Tangkap error tak terduga yang mungkin terjadi saat memanggil Server Action itu sendiri
//             setApiMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
//             console.error("Client-side catch (AuthForm handleSubmit):", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (field: string, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//         // Sederhanakan logika untuk menghapus error saat input berubah
//         setErrors(prevErrors => {
//             if (prevErrors[field]) {
//                 const newErrors = { ...prevErrors };
//                 delete newErrors[field];
//                 return newErrors;
//             }
//             return prevErrors;
//         });
//         if (apiMessage) {
//             setApiMessage(null); // Clear API message on new input
//         }
//     };

//     const getPasswordStrengthColor = () => {
//         if (passwordStrength <= 2) return 'bg-red-500';
//         if (passwordStrength <= 3) return 'bg-yellow-500';
//         if (passwordStrength <= 4) return 'bg-blue-500';
//         return 'bg-green-500';
//     };

//     const getPasswordStrengthText = () => {
//         if (passwordStrength <= 2) return 'Weak';
//         if (passwordStrength <= 3) return 'Fair';
//         if (passwordStrength <= 4) return 'Good';
//         return 'Strong';
//     };

//     return (
//         <div className="w-full max-w-md mx-auto">
//             <div className="text-center mb-8">
//                 <div className="flex items-center justify-center mb-4">
//                     <div className="relative">
//                         <Shield className="w-12 h-12 text-blue-400" />
//                         <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
//                     </div>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-white bg-clip-text text-transparent mb-2">
//                     {mode === 'login' ? 'Welcome Back' : 'Create Account'}
//                 </h1>
//                 <p className="text-orange-200">
//                     {mode === 'login' ? 'Sign in to your secure banking portal' : 'Join our premium banking experience'}
//                 </p>
//             </div>

//             {apiMessage && (
//                 <div className={`mb-6 p-4 rounded-lg backdrop-blur-md border ${apiMessage.type === 'success'
//                         ? 'bg-green-500/10 border-green-500/30 text-green-400'
//                         : 'bg-red-500/10 border-red-500/30 text-red-400'
//                     } flex items-center gap-2`}>
//                     {apiMessage.type === 'success' ? (
//                         <CheckCircle className="w-5 h-5" />
//                     ) : (
//                         <AlertCircle className="w-5 h-5" />
//                     )}
//                     {apiMessage.text}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-4">
//                     {/* Username Field */}
//                     <div className="relative group">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
//                         </div>
//                         <Input
//                             type="text"
//                             id="username" // Tambahkan ID untuk fokus otomatis
//                             placeholder="Username"
//                             value={formData.username}
//                             onChange={(e) => handleInputChange('username', e.target.value)}
//                             className={`
//                                 pl-10 h-12 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400
//                                 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-900/70
//                                 backdrop-blur-md transition-all duration-300
//                                 ${errors.username ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}
//                             `}
//                             disabled={loading}
//                         />
//                         {errors.username && (
//                             <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
//                                 <AlertCircle className="w-4 h-4" />
//                                 {errors.username}
//                             </p>
//                         )}
//                     </div>

//                     {/* Email Field (Signup only) */}
//                     {mode === 'signup' && (
//                         <div className="relative group">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
//                             </div>
//                             <Input
//                                 type="email"
//                                 id="email" // Tambahkan ID
//                                 placeholder="Email address"
//                                 value={formData.email}
//                                 onChange={(e) => handleInputChange('email', e.target.value)}
//                                 className={`
//                                     pl-10 h-12 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400
//                                     focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-900/70
//                                     backdrop-blur-md transition-all duration-300
//                                     ${errors.email ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}
//                                 `}
//                                 disabled={loading}
//                             />
//                             {errors.email && (
//                                 <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
//                                     <AlertCircle className="w-4 h-4" />
//                                     {errors.email}
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* Password Field */}
//                     <div className="relative group">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
//                         </div>
//                         <Input
//                             type={showPassword ? 'text' : 'password'}
//                             id="password" // Tambahkan ID
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={(e) => handleInputChange('password', e.target.value)}
//                             className={`
//                                 pl-10 pr-10 h-12 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400
//                                 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-900/70
//                                 backdrop-blur-md transition-all duration-300
//                                 ${errors.password ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}
//                             `}
//                             disabled={loading}
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                             disabled={loading}
//                         >
//                             {showPassword ? (
//                                 <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
//                             ) : (
//                                 <Eye className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
//                             )}
//                         </button>
//                         {errors.password && (
//                             <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
//                                 <AlertCircle className="w-4 h-4" />
//                                 {errors.password}
//                             </p>
//                         )}
//                     </div>

//                     {/* Password Strength Indicator (Signup only) */}
//                     {mode === 'signup' && formData.password && (
//                         <div className="space-y-2">
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-400">Password strength:</span>
//                                 <span className={`${passwordStrength <= 2 ? 'text-red-400' :
//                                         passwordStrength <= 3 ? 'text-yellow-400' :
//                                             passwordStrength <= 4 ? 'text-blue-400' : 'text-green-400'
//                                     }`}>
//                                     {getPasswordStrengthText()}
//                                 </span>
//                             </div>
//                             <div className="w-full bg-gray-700/50 rounded-full h-2">
//                                 <div
//                                     className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
//                                     style={{ width: `${(passwordStrength / 5) * 100}%` }}
//                                 ></div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <Button
//                     type="submit"
//                     className="w-full h-12 bg-blue-900 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                     disabled={loading}
//                 >
//                     {loading ? (
//                         <div className="flex items-center gap-2">
//                             <Loader2 className="w-5 h-5 animate-spin" />
//                             {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
//                         </div>
//                     ) : (
//                         mode === 'login' ? 'Sign In' : 'Create Account'
//                     )}
//                 </Button>
//             </form>

//             <div className="mt-8 text-center">
//                 <p className="text-gray-400">
//                     {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
//                     <button
//                         type="button" // Penting: Ini harus type="button" agar tidak memicu submit form
//                         onClick={onToggleMode}
//                         className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
//                         disabled={loading}
//                     >
//                         {mode === 'login' ? 'Sign up here' : 'Sign in here'}
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// }
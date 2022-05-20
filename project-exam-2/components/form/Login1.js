// export function LoginAdmin(){

//     export default function LoginForm(){
//         const [username, setUsername] = useState("");
//         const [password, setPassword] = useState("");
    
//         async function handleLogin(){
//             const loginInfo = {
//                 identifier: username,
//                 password: password
//             }
    
//             const response = await axios.post(url, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(loginInfo)
//             })
    
//             const loginResponse = await response.json();
//             console.log(loginResponse)
//         } 
//         return(
//         <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm} disabled={submitting}>
//             <div className={styles.username}>
//                 <p>Username</p>
//                 <input {...register("username")} placeholder="Username/email" className={styles.formInput} onChange={e => setUsername(e.target.value)} value={username}/>
//                 {errors.username && <span className={styles.formError}>{errors.username.message}</span>}
//             </div>
//             <div className={styles.password}>
//                 <p>Password</p>
//                 <input {...register("password")} placeholder="Password" className={styles.formInput} onChange={e => setUsername(e.target.value)} value={username}/>
//                 {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
//             </div>
//             <button className={styles.loginBtn}>{submitting ? "Logging in.." : "Log in"}</button>
//         </form>
//         )
//     }
// }
    
    
    
   

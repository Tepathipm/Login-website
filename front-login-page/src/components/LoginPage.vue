<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';


const fetchBack = import.meta.env.VITE_ROOT_API
const router = useRouter()
const username = ref('')
const password = ref('')

const loginUser = async () => {
  try {
    const response = await fetch(`${fetchBack}/data/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username.value ,
        user_password: password.value, 
      }),
    });

    // If login is successful, navigate to the user page
    if (response.status === 200) {
      const data = await response.json(); // Parse the response JSON
      router.push({ name: 'user', params: { user_name: data.result.user_name } });
    } else {
      // Handle other response statuses (e.g., 401 for invalid credentials)
      console.error('Login failed:', (await response.json()).message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

</script>

<template>
    <div class="background w-screen h-screen">
        <div class="login-parent h-full w-full flex justify-center items-center">
            <div class="login-child relative space-y-3">
                <h1 class="text-white text-3xl font-bold mb-10">Welcome Back!</h1>
                <h2 class="text-white font-semibold">Enter your Credentials to access your account</h2>
                <div class="input-parent h-full flex flex-col space-y-7 gap-3 absolute">
                    <div class="input-group">
                        <input type="text" required class="usr" v-model="username">
                        <label class="font-semibold">USERNAME</label>
                        <i></i>
                    </div>
                    <div class="input-group">
                        <input type="password" required class="pwd" v-model="password">
                        <label class="font-semibold">PASSWORD</label>
                        <i></i>
                    </div>
                </div>
                <div class="btn-login">
                        <button class="w-full h-10 border bg-[#3f2b96] rounded-2xl" @click="loginUser">
                            <span class="text-white font-semibold">Login</span>
                        </button>
                </div>
                <div class="register w-full h-10 flex flex-col gap-7 items-center justify-center absolute">
                    <!-- <i class="line-one"></i>
                    <i class="line-two"></i> -->
                    <span class="text-white font-semibold">or</span>
                    <p class="text-white font-semibold">
                        Don’t have an account? 
                        <router-link to="/signup" class="text-[#FCCB06] underline">
                            Sign Up
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
html{
  scroll-behavior: smooth;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.register{
    top: 77%;
}
/* .line-one{
    position: absolute;
    left: 0;
    bottom: 50%;
    width: 47%;
    height: 0.5px;
    background: #FFF;
}
.line-two{
    position: absolute;
    right: 0;
    bottom: 50%;
    width: 47%;
    height: 0.5px;
    background: #FFF;
} */
.background{
    opacity: 94%;
    background: linear-gradient(90deg, #0f0c29, #302b63, #24243e);
}
.login-child{
    width: 404px;
    height: 583px;
}
.btn-login{
    position: absolute;
    top: 60%;
    width: 400px;
    height: 40px;
}
.input-parent{
    top: 20%;
}

.input-group{
    position: relative;
    margin: 20px 0
}
.input-group label{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.5);
    font-size: 17px;
    padding: 0 5px;
    pointer-events: none;
    transition: .5s;
}
.input-group input{
    width: 400px;
    height: 40px;
    background: transparent;
    font-size: 17px;
    color: #FFF;
    padding: 10px 0 5px;
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 16px;
}
.input-group input:focus~label,
.input-group input:valid~label{
    top: 0;
    left: 0;
    font-size: 15px;
    color: #FCCB06;
}
.input-group i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #FFF;
    overflow: hidden;
}
.input-group i::before{
    content: '';
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #40E0D0, #FF8C00, #FF0080,#FF8C00,#40E0D0);
    animation: animate 2s linear infinite;
    transition: 0.5s;
}

.input-group input:focus~i::before,
.input-group input:valid~i::before{
    left: 0;
}
@keyframes animate {
        0%{
            background-position-x: 0;
        }
        100%{
            background-position-x: 400px;
        }
}
</style>
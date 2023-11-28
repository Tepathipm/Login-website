<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';


const fetchBack = import.meta.env.VITE_ROOT_API
const router = useRouter()
const usr = ref('')
const password = ref('')

const singup = async() => {
    try{
        const res = await fetch(`${fetchBack}/data/signup`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                user_name : usr.value,
                user_password : password.value
            })
        })
        if(res.ok){
            const data = await res.json()
            alert(data.message)
            usr.value = ''
            password.value = ''
            router.push('/')
        }
    } catch(err){
        alert(err)
    }
}
</script>

<template>
    <div class="background w-screen h-screen">
        <div class="login-parent h-full w-full flex justify-center items-center">
            <div class="login-child relative space-y-3">
                <h1 class="text-white text-3xl font-bold mb-10">Get Started Now</h1>
                <div class="input-parent h-full flex flex-col space-y-7 gap-3 absolute">
                    <div class="input-group">
                        <input type="text" required class="usr" v-model="usr">
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
                        <button class="w-full h-10 border bg-[#3f2b96] rounded-2xl" @click="singup">
                            <span class="text-white font-semibold">Signup</span>
                        </button>
                </div>
                <div class="register w-full h-10 flex flex-col gap-7 items-center justify-center absolute">
                    <!-- <i class="line-one"></i>
                    <i class="line-two"></i> -->
                    <span class="text-white font-semibold">or</span>
                    <p class="text-white font-semibold">
                        Have an account?
                        <router-link to="/" class="text-[#FCCB06] underline">
                            Sign In
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
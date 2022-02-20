
const url = 'https://vue3-course-api.hexschool.io/v2';

const app = Vue.createApp({
    data(){
        return {
            user: {
              username: '',
              password: ''
            },
            isLogin: ''
        }
    },
    methods: {
      login(){
        const api = `${url}/admin/signin`;

        if(this.user.username === '' || this.user.password === ''){
          this.isLogin = '-1';
        }else{
          axios.post(api,this.user).then((res)=>{
            console.log(res.data);
            this.isLogin = '1';
            const {token, expires} = res.data;
            document.cookie = `vueToken=${token}; expire${new Date(expires)}`;
            parent.window.location.replace('./product.html');
          }).catch((err)=>{
            console.log(err);
            this.isLogin = '0';
            this.user.password = '';
          });
        }
      },
    },
    created(){
      const isCookie = document.cookie.match(/^(.*;)?\s*vueToken\s*=\s*[^;]+(.*)?$/);
        if(isCookie){
          parent.window.location.replace('./product.html');
        }
    }
}).mount('#app');
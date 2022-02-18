
const app = Vue.createApp({
  data(){
      return {
          apiUrl: 'https://vue3-course-api.hexschool.io/v2',
          apiPath: 'vue-boni',
          products: [],
          total: 0,
          isShowModal: false,
          tempProduct: {
              imagesUrl: [],
          },
      }
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  },
  methods: {
      checkAdmin(){
          const url = `${this.apiUrl}/api/user/check`;
          axios.post(url)
          .then(()=>{
              this.getData();
          })
          .catch((err)=>{
              alert(err.data.message);
              window.location = 'index.html';
          })
      },
      getData(){
          const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
          axios.get(url)
              .then((res)=>{
                  this.products = res.data.products;
                  this.total = Object.keys(res.data.products).length;
              })
              .catch((err)=>{
                  alert(err.data.message);
              });
      },
      openModal(item){
        this.tempProduct = { ...item };
        this.isNew = false;
        console.log('hello')
        this.isShowModal = true;
        console.log(this.isShowModal)
      },
  },
}).mount('#app');
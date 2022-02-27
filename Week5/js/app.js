import detailModal from './detailModal.js';

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "vue-boni";


// 表單驗證
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


// Vue
Vue.createApp({
  data(){
    return {
      loadingStatus:{
        loadingItem:'',
      },
      isLoading: true,
      products: [],
      product:{},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods:{
    getProducts(){
      this.isLoading = true;
      const url = `${apiUrl}/api/${apiPath}/products`;
      axios.get(url).then((res) => {
        this.products = res.data.products;
        this.isLoading = false;
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    getItem(id){
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      axios.get(url).then((res) => {
        this.product = res.data.product;
        this.$refs.detailModal.openModal();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    addToCart(id, qty = 1) {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      this.loadingStatus.loadingItem = id;
      this.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.$refs.detailModal.hideModal();
      axios.post(url, { data: cart }).then((res) => {
        alert(res.data.message);
        this.loadingStatus.loadingItem = '';
        this.isLoading = false;
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((res) => {
        this.cart = res.data.data;
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    updateCart(data) {
      this.loadingStatus.loadingItem = data.id;
      this.isLoading = true;
      const url = `${apiUrl}/api/${apiPath}/cart/${data.id}`;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      if(cart.qty <= 0){
        alert('商品數量不得小於 1 !');
        this.loadingStatus.loadingItem = '';
        this.isLoading = false;
      }else{
        axios.put(url, { data: cart }).then((res) => {
          alert(res.data.message);
          this.loadingStatus.loadingItem = '';
          this.isLoading = false;
          this.getCart();
        }).catch((err) => {
          alert(err.data.message);
          this.loadingStatus.loadingItem = '';
          this.isLoading = false;
        });
      }
    },
    removeCartItem(id) {
      const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      this.isLoading = true;
      axios.delete(url).then((res) => {
        alert(res.data.message);
        this.isLoading = false;
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    cleanAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((res) => {
        alert(res.data.message);
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const order = this.form;

      axios.post(url, { data: order }).then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
  },
  mounted(){
    this.getProducts();
    this.getCart();
  }
  
}).component('detailModal', detailModal).component('loading', VueLoading.Component).mount("#app");
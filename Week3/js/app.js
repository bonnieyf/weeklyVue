
const app = Vue.createApp({
    data(){
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'vue-boni',
            products: [],
            total: 0,
            isNew: false,
            isShowModal: false,
            isShowDelModal: false,
            tempProduct: {
                imagesUrl: [],
            },
            allPassed: false,
            formMessages:{
                title: {
                    isPass: null,
                    message: '商品標題為必填'
                },
                category: {
                    isPass: null,
                    message: '類別欄位為必填'
                },
                unit: {
                    isPass: null,
                    message: '單位欄位為必填'
                },
                origin_price:{
                    isPass: null,
                    message: '請輸入原價'
                },
                price: {
                    isPass: null,
                    message: '請輸入售價'
                },
            }
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
        openModal(status,item){
            if(status === 'new'){
                this.tempProduct = {
                    imagesUrl: [],
                }
                this.isNew = true;
                this.isShowModal = true;
                this.formMessages.title.isPass = null;
                this.formMessages.category.isPass = null;
                this.formMessages.unit.isPass = null;
                this.formMessages.origin_price.isPass = null;
                this.formMessages.price.isPass = null;
                this.allPassed = false;
                
            }else if(status === 'update'){
                this.tempProduct = { ...item };
                this.isNew = false;
                this.isShowModal = true;
            }else if(status === 'delete'){
                this.tempProduct = { ...item };
                this.isShowDelModal = true;
            }
        },
        updateProduct(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let http = 'post';

            if(!this.isNew){
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                http = 'put';
            }

            if(!this.tempProduct.title){
                this.formMessages.title.isPass = false;
            }

            if(!this.tempProduct.category){
                this.formMessages.category.isPass = false;
            }

            if(!this.tempProduct.unit){
                this.formMessages.unit.isPass = false;
            }

            if(!this.tempProduct.origin_price){
                this.formMessages.origin_price.isPass = false;
            }

            if(!this.tempProduct.price){
                this.formMessages.price.isPass = false;
            }

            if(this.formMessages.title.isPass &&  this.formMessages.category.isPass &&  this.formMessages.unit.isPass &&  this.formMessages.origin_price.isPass &&  this.formMessages.price.isPass){
                this.allPassed = true;
            }else{
                this.allPassed = false;
            }


            if(this.allPassed){
                axios[http](url,{
                    data: this.tempProduct
                })
                .then((res) =>{
                    alert(res.data.message);
                    this.isShowModal = false;
                    this.getData();
                })
                .catch(err =>{
                    console.log(err.data.message);
                });
            }
        },
        deleteProduct(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

            axios.delete(url)
                .then((res) =>{
                    alert(res.data.message);
                    this.isShowDelModal = false;
                    this.getData();
                })
                .catch(err =>{
                    console.log(err.data.message);
                });
        },
        createImages(){
            if (this.tempProduct.imageUrl) {
                if (!this.tempProduct.imagesUrl) {
                    this.tempProduct.imagesUrl = [''];
                } else {
                    this.tempProduct.imagesUrl.push('');
                }
            } else {
                alert("請先輸入主要圖片網址！");
            }
        }
    },
    watch:{
        'tempProduct.title': function(value) {
            if(value === ''){
                this.formMessages.title.isPass = false;
                return;
            }else{
                this.formMessages.title.isPass = true;
            }

        },
        'tempProduct.category': function(value) {
            console.log(value)
            if(value === ''){
                this.formMessages.category.isPass = false;
            }else{
                this.formMessages.category.isPass = true;
            }

        },
        'tempProduct.unit': function(value) {
            if(value === ''){
                this.formMessages.unit.isPass = false;
            }else{
                this.formMessages.unit.isPass = true;
            }

        },
        'tempProduct.origin_price': function(value) {
            if(value === ''){
                this.formMessages.origin_price.isPass = false;
            }else{
                this.formMessages.origin_price.isPass = true;
            }

        },
        'tempProduct.price': function(value) {
            if(value === ''){
                this.formMessages.price.isPass = false;
            }else{
                this.formMessages.price.isPass = true;
            }

        }
    }
}).mount('#app');
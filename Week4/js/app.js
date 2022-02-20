
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.js';
import pagination from './pagination.js';
import modalupdate from './modal-update.js';
import modaldeleted from './modal-deleted.js';

const app = createApp({
    components:{
        pagination,
        modalupdate,
        modaldeleted
    },
    data(){
        return {
            products: [],
            pagination: {},
            total: 0,
            isNew: false,
            isShowModal: false,
            isShowDelModal: false,
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
        switchModal(){
            this.isShowModal = !this.isShowModal;
        },
        switchDelModal(){
            this.isShowDelModal = !this.isShowDelModal;
        },
        checkAdmin(){
            const url = `${apiUrl}/api/user/check`;
            axios.post(url)
            .then(()=>{
                this.getData();
            })
            .catch((err)=>{
                alert(err.data.message);
                window.location = 'index.html';
            })
        },
        getData(page = 1){
            const url = `${apiUrl}/api/${apiPath}/admin/products/?page=${page}`;
            axios.get(url)
                .then((res)=>{
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
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
                this.switchModal();
                
            }else if(status === 'update'){
                this.tempProduct = { ...item };
                this.isNew = false;
                this.switchModal();
            }else if(status === 'delete'){
                this.tempProduct = { ...item };
                this.switchDelModal();
            }
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
}).mount('#app');
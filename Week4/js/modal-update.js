export default {
    props: ['tempProduct','isNew'],
    emits:['modal','getproducts','createimgs'],
    data(){
        return{
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
    methods:{
        updateProduct(){
            let url = `${apiUrl}/api/${apiPath}/admin/product`;
            let http = 'post';

            if(!this.isNew){
                url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
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
                    this.$emit('getproducts');
                    this.$emit('modal');
                })
                .catch(err =>{
                    console.log(err.data.message);
                });
            }

            
        },
    },
    created: function(){
        this.formMessages.title.isPass = null;
        this.formMessages.category.isPass = null;
        this.formMessages.unit.isPass = null;
        this.formMessages.origin_price.isPass = null;
        this.formMessages.price.isPass = null;
        this.allPassed = false; 
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
    },
    template: `
        <header class="modal-card-head">
            <p v-if="isNew" class="modal-card-title">新增產品</p>
            <p v-else class="modal-card-title">更新產品</p>
            <button class="delete" aria-label="close" @click="$emit('modal')"></button>
        </header>
        <section class="modal-card-body">
            <div id="create-product" class="columns">
            <div class="column is-6">
                <div class="field">
                <div class="control">
                    <label for="" ><b>主要圖片</b></label>
                    <input class="input" type="text" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                    <img :src="tempProduct.imageUrl" class="mt-2" alt="">
                </div>
                </div>

                <h2 class="subtitle mb-5 mt-5"><b>新增其他圖片</b></h2>
                <div v-if="Array.isArray(tempProduct.imagesUrl)" class="mb-3">
                <div class="field" v-for="(image,key,index) in tempProduct.imagesUrl" :key="key">
                    <div class="control">
                    <label for="" ><b>組圖：{{key+1}}</b></label>
                    <div class="columns">
                        <div class="column is-9">
                        <input class="input" type="text" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                        </div>
                        <div class="column is-3">
                        <button class="button buttons is-danger is-outlined are-small" style="width: 100%; text-align: center; justify-content: center;" @click="tempProduct.imagesUrl.splice(key, 1);">刪除</button>
                        </div>
                    </div>
                    <img :src="image" alt="">
                    </div>
                </div>
                </div>

                <button id="add-imgs-button" class="button buttons is-info is-outlined are-small" @click="$emit('createimgs');">新增圖片欄位</button>
                
            </div>

            
            <div class="column is-6">
                <div class="field">
                <div class="control">
                    <label for="">標題</label>
                    <input class="input" :class="{'is-danger' : formMessages.title.isPass == false}" type="text" placeholder="請輸入主要標題" v-model="tempProduct.title">
                    <p class="help is-danger" v-if="formMessages.title.isPass == false">{{ formMessages.title.message }}</p>
                </div>
                </div>

                <div class="columns">
                <div class="column">
                    <div class="field">
                    <div class="control">
                        <label for="">分類</label>
                        <input class="input" :class="{'is-danger' : formMessages.category.isPass == false}"  type="text" placeholder="請輸入分類" v-model="tempProduct.category">
                        <p class="help is-danger" v-if="formMessages.category.isPass == false">{{ formMessages.category.message }}</p>
                        </div>
                        
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                    <div class="control">
                        <label for="">單位</label>
                        <input class="input" :class="{'is-danger' : formMessages.unit.isPass == false}"  type="text" placeholder="請輸入分單位" v-model="tempProduct.unit">
                        <p class="help is-danger" v-if="formMessages.unit.isPass == false">{{ formMessages.unit.message }}</p>
                        </div>
                    </div>
                </div>
                </div>

                <div class="columns">
                <div class="column">
                    <div class="field">
                    <div class="control">
                        <label for="">原價</label>
                        <input class="input" :class="{'is-danger' : formMessages.origin_price.isPass == false}"  type="number" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                        <p class="help is-danger" v-if="formMessages.origin_price.isPass == false">{{ formMessages.origin_price.message }}</p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                    <div class="control">
                        <label for="">售價</label>
                        <input class="input" type="number"  :class="{'is-danger' : formMessages.price.isPass == false}"  placeholder="請輸入分售價" v-model="tempProduct.price">
                        <p class="help is-danger" v-if="formMessages.price.isPass == false">{{ formMessages.price.message }}</p>
                        </div>
                    </div>
                </div>
                </div>

                <div class="field">
                <div class="control">
                    <label for="">產品描述</label>
                    <textarea class="textarea" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                </div>
                <div class="field">
                <div class="control">
                    <label for="">說明內容</label>
                    <textarea class="textarea" placeholder="請輸入說明內容" v-model="tempProduct.content"></textarea>
                </div>
                </div>
                <label class="checkbox" for="isEnable">
                <input id="isEnable" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"> 是否啟用
                </label>
            </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" @click="updateProduct">確認</button>
            <button class="button" @click="$emit('modal')">取消</button>
        </footer>
    `
}
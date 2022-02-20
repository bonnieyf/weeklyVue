export default {
    props: ['tempProduct'],
    emits:['delmodal','getproducts'],
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
        deleteProduct(){
            let url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;

            axios.delete(url)
                .then((res) =>{
                    alert(res.data.message);
                    this.$emit('delmodal');
                    this.$emit('getproducts');
                })
                .catch(err =>{
                    console.log(err.data.message);
                });
        },
    },
    template: `
    <header class="modal-card-head">
        <p class="modal-card-title">刪除產品</p>
        <button class="delete" aria-label="close" @click="$emit('delmodal')"></button>
    </header>
    <section class="modal-card-body">
        <div id="create-product" class="columns">
        <div class="column is-6">
            <div class="field">
            <div class="control">
                <label for="" ><b>是否要刪除 <b class="has-text-danger">{{ tempProduct.title }}</b> 刪除後將無法恢復。</b></label>
                <img :src="tempProduct.imageUrl" alt="">
            </div>
            </div>
        </div>
        </div>
    </section>
    <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteProduct">確認刪除</button>
        <button class="button" @click="$emit('delmodal')">取消</button>
    </footer>
    `
}
<template>
  <div class="about">
    <loading v-model:active="isLoading" />
    <div class="container">
      <div style="margin-bottom: 20px"><h1>產品列表</h1></div>
      <div class="row row-cols-1 row-cols-lg-4 g-3" style="padding-bottom: 100px">
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card h-100">
            <img :src="product.imageUrl" class="card-img-top" :alt="product.name">
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text"><del class="h6" v-if="product.price">NT {{ product.origin_price }}</del> NT$ {{ product.price }} / {{ product.unit }}</p>
              <div class="btn-group btn-group-sm">
                <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary">
                  查看更多
                </router-link>

                <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emitter from '@/libs/emitter'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      products: [],
      isLoading: true
    }
  },
  components: {
    Loading
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      this.$http(url).then((res) => {
        this.products = res.data.products
        this.isLoading = false
      }).catch((err) => {
        alert(err.data.message)
      })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.loadingStatus.loadingItem = id
      this.isLoading = true
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        alert(res.data.message)
        this.loadingStatus.loadingItem = ''
        this.isLoading = false
        emitter.emit('get-cart')
      }).catch((err) => {
        alert(err.data.message)
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

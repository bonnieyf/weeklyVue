<template>
  <div class="about">
    <loading v-model:active="isLoading" />
    <div class="container">
      <router-link to="/products" class="btn btn-outline-secondary" style="margin-bottom: 30px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
        </svg>
        回列表
      </router-link>

      <div class="row" style="margin-bottom: 100px;">
        <div class="col">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="product.imageUrl"  class="d-block w-100" :alt="product.title">
              </div>
              <div class="carousel-item" v-for="img in product.imagesUrl" :key="img.id">
                <img :src="img" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col">
          <h1 style="margin-bottom: 30px;">
            <button type="button" class="btn btn-outline-secondary">{{ product.category }}</button>
            {{ product.title }}
          </h1>
          <p>Description: {{ product.description }}</p>
          <p>Notice: {{ product.content }}</p>
          <p>Price: {{ product.price }} / {{ product.unit }}</p>
          <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
            加到購物車
          </button>
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
      product: [],
      isLoading: true
    }
  },
  components: {
    Loading
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`).then(res => {
        this.product = res.data.product
        this.isLoading = false
      })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
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
    this.getProduct()
  }
}
</script>

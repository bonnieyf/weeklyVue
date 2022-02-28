<template>
  <div class="about">
    <loading v-model:active="isLoading" />
    <div class="container">
      <h1>購物車</h1>

      <div class="text-end">
                  <button class="btn btn-outline-danger" type="button" @click="cleanAllCarts">清空購物車</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input v-model.number="item.qty" @blur="updateCart(item)"
                      :disabled="loadingStatus.loadingItem === item.id" min="1" type="number" class="form-control">
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ item.final_total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
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
      cart: {},
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: true
    }
  },
  components: {
    Loading
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http(url).then((res) => {
        this.cart = res.data.data
        this.isLoading = false
      }).catch((err) => {
        alert(err.data.message)
      })
    },
    cleanAllCarts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url).then((res) => {
        alert(res.data.message)
        this.getCart()
        emitter.emit('get-cart')
      }).catch((err) => {
        alert(err.data.message)
      })
    },
    updateCart (data) {
      this.loadingStatus.loadingItem = data.id
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${data.id}`
      const cart = {
        product_id: data.product_id,
        qty: data.qty
      }
      if (cart.qty <= 0) {
        alert('商品數量不得小於 1 !')
        this.loadingStatus.loadingItem = ''
        this.isLoading = false
      } else {
        this.$http.put(url, { data: cart }).then((res) => {
          alert(res.data.message)
          this.loadingStatus.loadingItem = ''
          this.isLoading = false
          this.getCart()
        }).catch((err) => {
          alert(err.data.message)
          this.loadingStatus.loadingItem = ''
          this.isLoading = false
        })
      }
    },
    removeCartItem (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.loadingStatus.loadingItem = id
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        alert(res.data.message)
        this.isLoading = false
        this.loadingStatus.loadingItem = ''
        this.getCart()
        emitter.emit('get-cart')
      }).catch((err) => {
        alert(err.data.message)
      })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style style="scss">
.itemImg {
  width: 100%;
  height: 200px;
  background-size: cover;
}
</style>

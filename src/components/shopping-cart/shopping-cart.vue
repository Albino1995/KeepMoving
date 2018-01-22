<template>
  <div class="shopping-cart-wrapper">
    <span class="title">购物车</span>
    <div class="shopping-cart" v-show="getShoppingCartFlag">
      <!--购物车为空时提示区块-->
      <div class="empty-shopping-cart" v-show="!shoppingCart.length">
        <span class="empty-tips">您的购物车是空的</span>
        <span class="empty-content">您的购物车是空的</span>
      </div>
      <div class="item" v-show="shoppingCart.length">
        <ul>
          <li v-for="item in shoppingCart">
            <img :src="item.goods.img[0].image" width="160" height="160"/>
            <div class="item-property">
              <span>{{item.goods.goods.name}}</span>
              <span>￥{{item.goods.goods.price}}</span>
              <span class="item-detail detail">商品编号:&nbsp;&nbsp;&nbsp;{{item.goods.goods.goods_sn}}</span>
              <span class="item-detail">
                颜色:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.goods.goods_color}}
              </span>
              <span class="item-detail">
                尺码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.goods.goods_size}}
              </span>
              <div class="button-group">
                <button class="delete" @click="_showConfirm(item)">
                  <i class="fa fa-trash"></i>
                </button>
                <el-select v-model="item.nums"
                           placeholder="请选择"
                           size="small"
                           class="selection"
                           @change="updateShoppingCartItem(item)"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="tips">
              <span class="total">总价:&nbsp;&nbsp;￥{{item.goods.goods.price * item.nums}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="pay">
        <div class="right-title">
          <span>购物车总金额</span>
        </div>
        <div class="text-area">
          <div class="order-price">
            <span>订单价格:</span>
            <span>￥&nbsp;{{total}}</span>
          </div>
          <div class="fare">
            <span>运费:</span>
            <span>免费</span>
          </div>
          <div class="total">
            <span>总价:</span>
            <span>￥&nbsp;{{total}}</span>
          </div>
        </div>
        <div class="pay-button">
          <button class="get-order" v-show="shoppingCart.length">前往结账</button>
          <!--购物车为空时禁选按钮-->
          <button class="none-get-order" v-show="!shoppingCart.length" disabled="disabled">前往结账</button>
        </div>
      </div>
    </div>
    <loading v-show="!getShoppingCartFlag"></loading>
    <confirm text="确定将该商品从购物车移除吗？" @confirm="deleteShoppingCartItem" ref="confirm"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getShoppingCart, deleteShoppingCart, updateShoppingCart} from 'api/api'
  import Loading from 'base/loading/loading'
  import Confirm from 'base/confirm/confirm'

  export default {
    data() {
      return {
        shoppingCart: [],
        deleteItem: {},
        total: 0,
        getShoppingCartFlag: false,
        options: [
          {
            value: 1
          },
          {
            value: 2
          },
          {
            value: 3
          },
          {
            value: 4
          },
          {
            value: 5
          },
          {
            value: 6
          },
          {
            value: 7
          },
          {
            value: 8
          },
          {
            value: 9
          }
        ]
      }
    },
    activated() {
      this.deleteItem = {}
      this.getShoppingCartFlag = false
      this.getShoppingCartItem()
    },
    methods: {
      getShoppingCartItem() {
        getShoppingCart().then((res) => {
          this.shoppingCart = res.data
          this._computeOrderTotal()
          this.getShoppingCartFlag = true
        })
      },
      deleteShoppingCartItem() {
        deleteShoppingCart(this.deleteItem.goods.id).then(() => {
          this.$router.go(0)
        })
      },
      updateShoppingCartItem(item) {
        let params = {}
        params.nums = Number(item.nums)
        updateShoppingCart(item.goods.id, params).then(() => {
          this.$router.go(0)
        })
      },
      _showConfirm(item) {
        this.deleteItem = item
        this.$refs.confirm.show()
      },
      _computeOrderTotal() {
        this.shoppingCart.forEach((item) => {
          this.total += item.goods.goods.price * item.nums
        })
      }
    },
    components: {
      Loading,
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopping-cart-wrapper
    display: flex
    flex-direction: column
    align-content: center
    .title
      text-align center
      font-size: 25px
      font-weight: bolder
      margin: 20px 0 30px 0
    .shopping-cart
      display: flex
      justify-content: space-around
      margin-bottom: 30px
      .empty-shopping-cart
        width: 742px
        height: 100px
        padding: 20px
        border: 1px solid #9a9a9a
        display: flex
        flex-direction: column
        span
          margin: 7px 0
        .empty-tips
          font-size: 15px
          font-weight: bold
        .empty-content
          font-size: 13px
      .item
        width: 742px
        ul
          li
            display: flex
            justify-content: space-between
            padding: 20px
            margin-bottom: 10px
            width: 700px
            border: 1px solid #9a9a9a
            .item-property
              width: 300px
              margin: 30px 0 0 20px
              display: flex
              flex-direction: column
              span
                margin: 1px 0
              .detail
                margin-top: 10px
              .item-detail
                font-size: 13px
              .button-group
                margin-top: 15px
                width: 300px
                display: flex
                .delete
                  cursor: pointer
                  color: #000000
                  background-color: #ffffff
                  border: 1px solid #dcdfe6
                  border-radius: 4px
                  height: 32px
                  width: 130px
                  outline: none
                  &:hover
                    color: #ffffff
                    background-color: #000000
                    transition: all 0.3s
                    border: none
                .selection
                  width: 130px
                  margin-left 15px
            .tips
              width: 80px
              display: flex
              .total
                font-size: 13px
      .pay
        width: 300px
        height: 250px
        padding-top: 20px
        border: 1px solid #9a9a9a
        .right-title
          padding-bottom: 20px
          border-bottom: 1px solid #9a9a9a
          span
            font-size: 15px
            font-weight: lighter
            padding-left: 20px
        .text-area
          margin-top: 40px
          padding-bottom: 20px
          border-bottom: 1px solid #9a9a9a
          div
            display: flex
            justify-content: space-between
            margin: 5px 0
            span
              font-size: 13px
              padding: 0 20px
        .pay-button
          display: flex
          flex-direction row
          justify-content: center
          align-items: center
          height: 100px
          .get-order
            cursor: pointer
            height: 40px
            width: 200px
            color: #ffffff
            background-color: #000000
            border: none
            outline: none
            &:hover
              color: #000000
              background-color: #ffffff
              border: 0.5px solid #9a9a9a
              transition: all 0.3s
          .none-get-order
            height: 40px
            width: 200px
            color: #ffffff
            background-color: #808080
            border: none
            outline: none
</style>

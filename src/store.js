import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import products from './products.json'

Vue.use(Vuex)

let local = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
}

let catalogProducts = products.map(function (product) {
  return {
    ...product,
    isInCart: local.cart.some((cartItem) => cartItem.id === product.id),
  }
})

export default new Vuex.Store({
  state: {
    products: catalogProducts,
    cart: local.cart,
  },

  mutations: {
    addToCart: function (state, productId) {
      state.products.forEach(function(product) {
        if (product.id === productId) {

          product.isInCart = true

          product = {
            ...product,
            amount: 1,
            toDelete: false,
            deletedTime: null,
          }

          state.cart.push(product)
        }
      })

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    removeFromCart: function (state, productId) {
      state.products.forEach(function(product) {
        if (product.id === productId) {

          state.cart.forEach(function (cartItem, index) {
            if (cartItem.id === productId)
              state.cart.splice(index, 1)
              product.isInCart = false
          })
        }
      })

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    cartItemToDelete: function (state, cartItemId) {
      let newCart = state.cart.slice()
      let cartItem = newCart[cartItemId]

      if (cartItem.toDelete) {
        cartItem.toDelete = false
        cartItem.deletedTime = null

      } else {
        cartItem.toDelete = true
        cartItem.deletedTime = Date.now()
      }

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    changeCartItemAmount: function (state, payload) {
      let cartItemId = payload[0]
      let newValue = payload[1]

      state.cart.forEach(function (cartItem) {
        if (cartItem.id === cartItemId) cartItem.amount = newValue
      })
      
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
  },

  actions: {
    checkTemporaryCartItems: function (context) {
      let itemsToDelete = []

      context.state.cart.forEach(function (cartItem) {
        if (cartItem.toDelete && ((Date.now() - cartItem.deletedTime) / 1000 / 10) > 1)
          itemsToDelete.push(cartItem)
      })

      itemsToDelete.forEach(function (cartItem) {
        context.commit("removeFromCart", cartItem.id)
      })
    },

    cleanCart: function (context) {
      context.state.cart.slice().forEach(function (cartItem) {
        context.commit("removeFromCart", cartItem.id)
      })
    },
  }
})
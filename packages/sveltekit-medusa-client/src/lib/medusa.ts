import cookie from 'cookie'
import type { Cookies, RequestEvent } from '@sveltejs/kit'
import { encodeQueryParams, type QueryParams } from './encode-query-params'
import type {
  Address,
  Cart,
  Customer,
  Order,
  Product,
  ProductCollection,
  ProductCollections,
  ProductTypes,
  Products,
  ResponsePromise,
  ShippingOptions,
  Swap,
} from './types'

export interface RetrievalOptions {
  q?: string
  id?: string[]
  limit?: number
  offset?: number
  created_at?: string
  updated_at?: string
  sort?: string
  order?: string
  search?: string
}

export interface ProductRetrievalOptions extends RetrievalOptions {
  collection_id?: string[]
  type_id?: string[]
  tags?: string[]
  title?: string
  description?: string
  handle?: string
  category_id?: string[]
  expand?: string[]
  fields?: string[]
  order?: string
  cart_id?: string
  region_id?: string // The id of the Region to set prices based on.
  currency_code?: string // The currency code to use for price selection.
}

export interface ProductTypeRetrievalOptions extends RetrievalOptions {
  value?: string[]
}

export interface CollectionRetrievalOptions extends RetrievalOptions {
  handle?: string[]
}

// export interface ReviewRetrievalOptions extends RetrievalOptions {}

// export interface Review {
//   id?: string
//   customer_id?: string
//   product_id: string
//   display_name: string
//   title: string
//   content: string
//   rating: number
//   approved?: boolean
// }

export interface User {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

interface QueryArguments {
  path: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  body?: object
  locals?: App.Locals
}

export class MedusaClient {
  private url: string

  constructor(url: string) {
    this.url = url
  }

  setHeaders(locals: App.Locals) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    if (locals.sid) {
      // @ts-ignore
      headers.Cookie = `connect.sid=${locals.sid}`
    }

    return headers
  }

  async query({
    path,
    method = 'GET',
    locals = {},
    body = {},
  }: QueryArguments): Promise<any> {
    return await fetch(`${this.url}${path}`, {
      method,
      headers: this.setHeaders(locals),
      body: Object.keys(body).length != 0 ? JSON.stringify(body) : null,
    })
  }

  /**
   * Middleware function for handling authentication.
   * Called by `handle` in src/hooks.server.*s.
   */
  async handleRequest(event: RequestEvent) {
    event.locals.sid = event.cookies.get('sid')

    if (event.locals.sid) {
      event.locals.user = await this.getCustomer(event.locals, event.cookies)
    } else {
      event.locals.sid = ''
    }

    event.locals.cartid = event.cookies.get('cartid')

    if (event.locals.cartid) {
      event.locals.cart = await this.getCart(event.locals, event.cookies)
    } else {
      event.locals.cartid = ''
    }

    return event
  }

  async getSearchResults(q: string): ResponsePromise<{ hits: any[] }> {
    if (!q) {
      throw new Error('missing_query')
    }

    const path = `/store/products/search?${encodeQueryParams({ q })}`

    return await this.query({ path, method: 'POST' })
  }

  async getAllProductTypes(
    options: ProductTypeRetrievalOptions = {}
  ): ResponsePromise<ProductTypes> {
    const query = encodeQueryParams(options as QueryParams)
    const path = `/store/product-types?${query}`

    return await this.query({ path })
  }

  async getCollections(
    options: CollectionRetrievalOptions = {}
  ): ResponsePromise<ProductCollections> {
    const query = encodeQueryParams(options as QueryParams)
    const path = `/store/collections?${query}`

    return await this.query({ path })
  }

  // Returns an empty array if no collection is found
  async getCollectionByHandle(handle: string): Promise<ProductCollection> {
    const path = `/store/collections?handle[]=${handle}`
    return await this.query({ path })
      .then((response) => response.json())
      .then((data) => data.collections[0])
      .catch((error) => error)
  }

  async getCollectionById(
    id: string
  ): ResponsePromise<{ collection: ProductCollection }> {
    const path = `/store/collections/${id}`
    return await this.query({ path })
  }

  async getProduct(handle: string): Promise<Product> {
    const path = `/store/products?handle=${handle}`
    return await this.query({ path })
      .then((response) => response.json())
      .then((data) => data.products[0])
      .catch((error) => error)
  }

  // TODO
  // async getReviews(productId: string, options: ReviewRetrievalOptions = {}) {
  //   return await this.query({}, `/store/products/${productId}/reviews`)
  //     .then((res: any) => res.json())
  //     .then((data: any) => data.product_reviews)
  //     .catch(() => Array())
  // }
  // async getReview(reviewId: string) {
  //   // returns a review object on success, otherwise false
  //   return await this.query({}, `/store/reviews/${reviewId}`)
  //     .then((res: any) => res.json())
  //     .then((data: any) => data.product_review)
  //     .catch(() => false)
  // }
  // async addReview(locals: App.Locals, review: Review) {
  //   // @ts-ignore
  //   review.customer_id = locals.user.id
  //   return await this.query(
  //     locals,
  //     `/store/products/${review.product_id}/reviews`,
  //     'POST',
  //     review
  //   )
  //     .then((res: any) => res.ok)
  //     .catch(() => false)
  // }
  // async updateReview(locals: App.Locals, reviewId: string, review: Review) {
  //   return await this.query(
  //     locals,
  //     `/store/reviews/${reviewId}`,
  //     'POST',
  //     review
  //   )
  //     .then((res: any) => res.ok)
  //     .catch(() => false)
  // }

  async getCustomer(
    locals: App.Locals,
    cookies: Cookies
  ): Promise<{ customer: Customer }> {
    const path = '/store/auth'
    return await this.query({ locals, path })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          locals.sid = ''
          locals.user = {}
          cookies.delete('sid')
          throw response
        }
      })
      .then((data) => {
        return data.customer
      })
      .catch(() => {
        return null
      })
  }

  async login(
    locals: App.Locals,
    cookies: Cookies,
    email: string,
    password: string
  ): Promise<boolean> {
    const path = '/store/auth'

    const response = await this.query({
      locals,
      path,
      method: 'POST',
      body: { email, password },
    })

    if (response.status === 401) {
      throw new Error('unauthorized: no user found')
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`${data.type}: ${data.message}`)
    }

    locals.user = data.customer

    const currentCookies = response.headers.get('set-cookie')

    if (typeof currentCookies !== 'string') {
      throw new Error('No cookies set')
    }

    locals.sid = cookie.parse(currentCookies)['connect.sid']

    cookies.set('sid', locals.sid, {
      path: '/',
      maxAge: 60 * 60 * 24 * 400,
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    })

    return true
  }

  async logout(locals: App.Locals, cookies: Cookies): Promise<boolean> {
    const path = '/store/auth'

    const response = await this.query({ locals, path, method: 'DELETE' })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`${data.type}: ${data.message}`)
    }

    locals.sid = ''
    locals.user = {}
    cookies.delete('sid')
    return true
  }

  async register(
    locals: App.Locals,
    cookies: Cookies,
    user: User
  ): Promise<boolean> {
    const { email, password } = user
    const path = '/store/customers'

    const response = await this.query({
      locals,
      path,
      method: 'POST',
      body: user,
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`${data.type}: ${data.message}`)
    }

    return await this.login(locals, cookies, email, password)
  }

  async getCart(locals: App.Locals, cookies: Cookies): Promise<{ cart: Cart }> {
    if (locals.cartid) {
      const path = `/store/carts/${locals.cartid}`
      return await this.query({ path })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw response
          }
        })
        .then((data) => {
          return { cart: data.cart }
        })
        .catch((error) => {
          throw error
        })
    }

    return this.createCart(locals, cookies)
  }

  async createCart(
    locals: App.Locals,
    cookies: Cookies,
    items: { variant_id: string; quantity: number }[] = []
  ): Promise<{ cart: Cart }> {
    const path = '/store/carts'
    const method = 'POST'
    const body = { items }

    return await this.query({ path, method, body, locals })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then((data) => {
        const cart = data.cart as Cart

        cookies.set('cartid', cart.id, {
          path: '/',
          maxAge: 60 * 60 * 24 * 400,
          sameSite: 'strict',
          httpOnly: true,
          secure: true,
        })

        locals.cartid = cart.id

        return { cart }
      })
      .catch((error) => {
        throw error
      })
  }

  async addToCart({
    locals,
    cookies,
    variantId,
    quantity = 1,
  }: {
    locals: App.Locals
    cookies: Cookies
    variantId: string
    quantity: number
  }): Promise<ResponsePromise<{ cart: Cart }> | Promise<{ cart: Cart }>> {
    if (locals.cartid) {
      const path = `/store/carts/${locals.cartid}/line-items`
      const method = 'POST'
      const body = { variant_id: variantId, quantity }

      return await this.query({ path, method, body, locals })
    }

    return await this.createCart(locals, cookies, [
      { variant_id: variantId, quantity: quantity },
    ])
  }

  async removeFromCart(
    locals: App.Locals,
    lineId: string
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    if (!lineId) {
      throw new Error('missing_line_item_id')
    }

    const path = `/store/carts/${locals.cartid}/line-items/${lineId}`
    return await this.query({ path, method: 'DELETE', locals })
  }

  async updateCart(
    locals: App.Locals,
    lineId: string,
    quantity: number
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    if (!lineId) {
      throw new Error('missing_line_item_id')
    }

    if (!quantity) {
      throw new Error('missing_quantity')
    }

    const path = `/store/carts/${locals.cartid}/line-items/${lineId}`
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { quantity },
    })
  }

  async updateCartBillingAddress(
    locals: App.Locals,
    address: Address
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    const path = `/store/carts/${locals.cartid}`
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { billing_address: address },
    })
  }

  async updateCartShippingAddress(
    locals: App.Locals,
    address: Address
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    const path = `/store/carts/${locals.cartid}`
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { shipping_address: address },
    })
  }

  async getShippingOptions(
    locals: App.Locals
  ): ResponsePromise<ShippingOptions> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    const path = `/store/shipping-options/${locals.cartid}`
    return await this.query({ path, locals })
  }

  async selectShippingOption(
    locals: App.Locals,
    shippingOptionId: string
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    if (!shippingOptionId) {
      throw new Error('missing_shipping_option_id')
    }

    const path = `/store/carts/${locals.cartid}/shipping-options`
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { option_id: shippingOptionId },
    })
  }

  async createPaymentSessions(
    locals: App.Locals
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    const path = `/store/carts/${locals.cartid}/payment-sessions`
    return await this.query({ path, method: 'POST', locals })
  }

  async selectPaymentSession(
    locals: App.Locals,
    providerId: string
  ): ResponsePromise<{ cart: Cart }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    const path = `/store/carts/${locals.cartid}/payment-session`
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { provider_id: providerId },
    })
  }

  /**
   * If a cart was successfully authorized, but requires further action, a Cart with updated payment sessions will be returned.
   * If successfully completed, an Order will be returned.
   */
  async completeCart(locals: App.Locals): ResponsePromise<{
    type: 'order' | 'cart' | 'swap'
    data: Order | Cart | Swap
  }> {
    if (!locals.cartid) {
      throw new Error('no_cart_found')
    }

    const path = `/store/carts/${locals.cartid}/complete`
    return await this.query({ path, method: 'POST', locals })
  }

  async addShippingAddress(
    locals: App.Locals,
    address: Address
  ): ResponsePromise<{ customer: Customer }> {
    if (!locals.user) {
      throw new Error('no_user_found')
    }

    const path = '/store/customers/me/addresses'
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { address },
    })
  }

  async updateShippingAddress(
    locals: App.Locals,
    addressId: string,
    address: Address
  ): ResponsePromise<{ customer: Customer }> {
    if (!locals.user) {
      throw new Error('no_user_found')
    }

    const path = `/store/customers/me/addresses/${addressId}`

    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { address },
    })
  }

  async deleteAddress(
    locals: App.Locals,
    addressId: string
  ): ResponsePromise<{ customer: Customer }> {
    if (!locals.user) {
      throw new Error('no_user_found')
    }

    const path = `/store/customers/me/addresses/${addressId}`

    return await this.query({ path, method: 'DELETE', locals })
  }

  // TODO FIX
  // async getShippingAddresses(locals: App.Locals): Promise<Address[]> {
  //   if (!locals.user) {
  //     throw new Error('no_user_found')
  //   }

  //   await this.getCustomer(locals, {})

  //   return []
  // }

  async getOrder(
    locals: App.Locals,
    id: string
  ): ResponsePromise<{ order: Order }> {
    if (!id) {
      throw new Error('missing_order_id')
    }

    const path = `/store/orders/${id}`
    return await this.query({ path, locals })
  }

  async editCustomer(
    locals: App.Locals,
    customer: Pick<
      Customer,
      | 'first_name'
      | 'last_name'
      | 'billing_address'
      | 'password'
      | 'phone'
      | 'email'
      | 'metadata'
    >
  ): Promise<Customer> {
    if (!locals.user) {
      throw new Error('no_user_found')
    }

    const path = '/store/customers/me'
    return await this.query({
      path,
      method: 'POST',
      locals,
      body: { customer },
    })
  }

  async requestResetPassword(email: string): ResponsePromise<{}> {
    if (!email) {
      throw new Error('missing_email')
    }

    const path = '/store/customers/password-token'
    return await this.query({ path, method: 'POST', body: { email } })
  }

  async resetPassword(
    email: string,
    password: string,
    token: string
  ): ResponsePromise<{}> {
    if (!email) {
      throw new Error('missing_email')
    }

    if (!password) {
      throw new Error('missing_password')
    }

    if (!token) {
      throw new Error('missing_token')
    }

    const path = '/store/customers/password-reset'

    return await this.query({
      path,
      method: 'POST',
      body: { email, password, token },
    })
  }

  // @ts-ignore
  onlyUnique = (value, index, self) => self.indexOf(value) === index

  // @ts-ignore
  filteredValues = (option) =>
    // @ts-ignore
    option.values.map((v) => v.value).filter(this.onlyUnique)
}

type PaginatedResponse = {
  limit: number
  offset: number
  count: number
}

type BaseEntity = {
  id: string
  created_at: Date
  updated_at: Date
}

type SoftDeletableEntity = BaseEntity & {
  deleted_at: Date | null
}

enum ProductStatus {
  DRAFT = 'draft',
  PROPOSED = 'proposed',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
}

export type Image = SoftDeletableEntity & {
  url: string
  metadata: Record<string, unknown>
}

export declare enum PaymentSessionStatus {
  AUTHORIZED = 'authorized',
  PENDING = 'pending',
  REQUIRES_MORE = 'requires_more',
  ERROR = 'error',
  CANCELED = 'canceled',
}

export type PaymentSession = BaseEntity & {
  cart_id: string | null
  cart: Cart
  provider_id: string
  is_selected: boolean | null
  is_initiated: boolean
  status: string
  data: Record<string, unknown>
  idempotency_key: string
  amount: number
  payment_authorized_at: Date
}

type Payment = {
  swap_id: string
  swap: Swap
  cart_id: string
  cart: Cart
  order_id: string
  order: Order
  amount: number
  currency_code: string
  currency: Currency
  amount_refunded: number
  provider_id: string
  data: Record<string, unknown>
  captured_at: Date | string
  canceled_at: Date | string
  metadata: Record<string, unknown>
  idempotency_key: string
}

enum CartType {
  DEFAULT = 'default',
  SWAP = 'swap',
  DRAFT_ORDER = 'draft_order',
  PAYMENT_LINK = 'payment_link',
  CLAIM = 'claim',
}

export type Cart = SoftDeletableEntity & {
  email: string
  billing_address_id: string
  billing_address: Address
  shipping_address_id: string
  shipping_address: Address | null
  items: LineItem[]
  region_id: string
  region: Region
  discounts: Discount[]
  gift_cards: GiftCard[]
  customer_id: string
  customer: Customer
  payment_session: PaymentSession | null
  payment_sessions: PaymentSession[]
  payment_id: string
  payment: Payment
  shipping_methods: ShippingMethod[]
  type: CartType
  completed_at: Date
  payment_authorized_at: Date
  idempotency_key: string
  context: Record<string, unknown>
  metadata: Record<string, unknown>
  sales_channel_id: string | null
  sales_channel: SalesChannel
  shipping_total?: number
  discount_total?: number
  item_tax_total?: number | null
  shipping_tax_total?: number | null
  tax_total?: number | null
  refunded_total?: number
  total?: number
  subtotal?: number
  refundable_amount?: number
  gift_card_total?: number
  gift_card_tax_total?: number
}

type SalesChannelLocation = SoftDeletableEntity & {
  sales_channel_id: string
  location_id: string
  sales_channel: SalesChannel
}

type SalesChannel = SoftDeletableEntity & {
  name: string
  description: string | null
  is_disabled: boolean
  locations: SalesChannelLocation[]
}

export type Currency = {
  code: string
  symbol: string
  symbol_native: string
  name: string
  includes_tax?: boolean
}

enum PriceListType {
  SALE = 'sale',
  OVERRIDE = 'override',
}

enum PriceListStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

enum FulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  PARTIALLY_SHIPPED = 'partially_shipped',
  SHIPPED = 'shipped',
  PARTIALLY_RETURNED = 'partially_returned',
  RETURNED = 'returned',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

enum PaymentStatus {
  NOT_PAID = 'not_paid',
  AWAITING = 'awaiting',
  CAPTURED = 'captured',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

export type ProductType = {
  value: string
  metadata: Record<string, unknown>
}

enum ShippingProfileType {
  DEFAULT = 'default',
  GIFT_CARD = 'gift_card',
  CUSTOM = 'custom',
}

type ShippingProfile = {
  name: string
  type: ShippingProfileType
  products: Product[]
  shipping_options: ShippingOption[]
  metadata: Record<string, unknown>
}

type FulfillmentProvider = {
  id: string
  is_installed: boolean
}

enum ShippingOptionPriceType {
  FLAT_RATE = 'flat_rate',
  CALCULATED = 'calculated',
}

enum RequirementType {
  MIN_SUBTOTAL = 'min_subtotal',
  MAX_SUBTOTAL = 'max_subtotal',
}

type ShippingOptionRequirement = {
  id: string
  shipping_option_id: string
  shipping_option: ShippingOption
  type: RequirementType
  amount: number
  deleted_at: Date
}

export type ShippingOption = {
  name: string
  region_id: string
  region: Region
  profile_id: string
  profile: ShippingProfile
  provider_id: string
  provider: FulfillmentProvider
  price_type: ShippingOptionPriceType
  amount: number | null
  is_return: boolean
  admin_only: boolean
  requirements: ShippingOptionRequirement[]
  data: Record<string, unknown>
  metadata: Record<string, unknown>
  includes_tax: boolean
}

type TaxRate = {
  rate: number | null
  code: string | null
  name: string
  region_id: string
  region: Region
  metadata: Record<string, unknown>
  products: Product[]
  product_types: ProductType[]
  shipping_options: ShippingOption[]
  product_count?: number
  product_type_count?: number
  shipping_option_count?: number
}

type TaxProvider = {
  id: string
  is_installed: boolean
}

type PaymentProvider = {
  id: string
  is_installed: boolean
}

type Region = SoftDeletableEntity & {
  name: string
  currency_code: string
  currency: Currency
  tax_rate: number
  tax_rates: TaxRate[] | null
  tax_code: string
  gift_cards_taxable: boolean
  automatic_taxes: boolean
  countries: Country[]
  tax_provider_id: string | null
  tax_provider: TaxProvider
  payment_providers: PaymentProvider[]
  fulfillment_providers: FulfillmentProvider[]
  metadata: Record<string, unknown>
  includes_tax: boolean
}

type Country = {
  id: number
  iso_2: string
  iso_3: string
  num_code: number
  name: string
  display_name: string
  region_id: string | null
  region: Region
}

export type Address = SoftDeletableEntity & {
  customer_id: string | null
  customer: Customer | null
  company: string | null
  first_name: string | null
  last_name: string | null
  address_1: string | null
  address_2: string | null
  city: string | null
  country_code: string | null
  country: Country | null
  province: string | null
  postal_code: string | null
  phone: string | null
  metadata: Record<string, unknown>
}

enum DiscountRuleType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}

enum AllocationType {
  TOTAL = 'total',
  ITEM = 'item',
}

enum DiscountConditionType {
  PRODUCTS = 'products',
  PRODUCT_TYPES = 'product_types',
  PRODUCT_COLLECTIONS = 'product_collections',
  PRODUCT_TAGS = 'product_tags',
  CUSTOMER_GROUPS = 'customer_groups',
}

enum DiscountConditionOperator {
  IN = 'in',
  NOT_IN = 'not_in',
}

export type ProductTag = {
  value: string
  metadata: Record<string, unknown>
}

export type ProductCollection = {
  title: string
  handle: string
  products: Product[]
  metadata: Record<string, unknown>
}

type DiscountCondition = {
  type: DiscountConditionType
  operator: DiscountConditionOperator
  discount_rule_id: string
  discount_rule: DiscountRule
  products: Product[]
  product_types: ProductType[]
  product_tags: ProductTag[]
  product_collections: ProductCollection[]
  customer_groups: CustomerGroup[]
  metadata: Record<string, unknown>
}

type DiscountRule = {
  description: string
  type: DiscountRuleType
  value: number
  allocation: AllocationType
  conditions: DiscountCondition[]
  metadata: Record<string, unknown>
}

type Discount = SoftDeletableEntity & {
  code: string
  is_dynamic: boolean
  rule_id: string
  rule: DiscountRule
  is_disabled: boolean
  parent_discount_id: string
  parent_discount: Discount
  starts_at: Date
  ends_at: Date | null
  valid_duration: string | null
  regions: Region[]
  usage_limit: number | null
  usage_count: number
  metadata: Record<string, unknown>
}

type GiftCard = {
  code: string
  value: number
  balance: number
  region_id: string
  region: Region
  order_id: string
  order: Order
  is_disabled: boolean
  ends_at: Date
  tax_rate: number | null
  metadata: Record<string, unknown>
}

enum ClaimType {
  REFUND = 'refund',
  REPLACE = 'replace',
}

enum ClaimPaymentStatus {
  NA = 'na',
  NOT_REFUNDED = 'not_refunded',
  REFUNDED = 'refunded',
}

enum ClaimFulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  PARTIALLY_SHIPPED = 'partially_shipped',
  SHIPPED = 'shipped',
  PARTIALLY_RETURNED = 'partially_returned',
  RETURNED = 'returned',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

enum ClaimReason {
  MISSING_ITEM = 'missing_item',
  WRONG_ITEM = 'wrong_item',
  PRODUCTION_FAILURE = 'production_failure',
  OTHER = 'other',
}

export type ClaimImage = {
  claim_item_id: string
  claim_item: ClaimItem
  url: string
  metadata: Record<string, unknown>
}

type ClaimItem = {
  images: ClaimImage[]
  claim_order_id: string
  claim_order: ClaimOrder
  item_id: string
  item: LineItem
  variant_id: string
  variant: ProductVariant
  reason: ClaimReason
  note: string
  quantity: number
  tags: ClaimTag[]
  metadata: Record<string, unknown>
}

type ClaimTag = SoftDeletableEntity & {
  value: string
  metadata: Record<string, unknown>
}

type TaxLine = BaseEntity & {
  rate: number
  name: string
  code: string | null
  metadata: Record<string, unknown>
}

type LineItemTaxLine = TaxLine & {
  item_id: string
  item: LineItem
}

export declare class LineItemAdjustment {
  id: string
  item_id: string
  item: LineItem
  description: string
  discount: Discount
  discount_id: string
  amount: number
  metadata: Record<string, unknown>
  private beforeInsert
}

export type LineItem = BaseEntity & {
  cart_id: string
  cart: Cart
  order_id: string | null
  order: Order
  swap_id: string
  swap: Swap
  claim_order_id: string
  claim_order: ClaimOrder
  tax_lines: LineItemTaxLine[]
  adjustments: LineItemAdjustment[]
  original_item_id?: string | null
  order_edit_id?: string | null
  order_edit?: OrderEdit | null
  title: string
  description: string | null
  thumbnail: string | null
  is_return: boolean
  is_giftcard: boolean
  should_merge: boolean
  allow_discounts: boolean
  has_shipping: boolean | null
  unit_price: number
  variant_id: string | null
  variant: ProductVariant
  quantity: number
  fulfilled_quantity: number | null
  returned_quantity: number | null
  shipped_quantity: number | null
  metadata: Record<string, unknown>
  includes_tax: boolean
  refundable?: number | null
  subtotal?: number | null
  tax_total?: number | null
  total?: number | null
  original_total?: number | null
  original_tax_total?: number | null
  discount_total?: number | null
  gift_card_total?: number | null
}

export declare enum OrderEditItemChangeType {
  ITEM_ADD = 'item_add',
  ITEM_REMOVE = 'item_remove',
  ITEM_UPDATE = 'item_update',
}

type OrderItemChange = SoftDeletableEntity & {
  type: OrderEditItemChangeType
  order_edit_id: string
  order_edit: OrderEdit
  original_line_item_id?: string
  original_line_item?: LineItem
  line_item_id?: string
  line_item?: LineItem
}

export declare enum OrderEditStatus {
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  REQUESTED = 'requested',
  CREATED = 'created',
  CANCELED = 'canceled',
}

type OrderEdit = BaseEntity & {
  order_id: string
  order: Order
  changes: OrderItemChange[]
  internal_note?: string
  created_by: string
  requested_by?: string
  requested_at?: Date
  confirmed_by?: string
  confirmed_at?: Date
  declined_by?: string
  declined_reason?: string
  declined_at?: Date
  canceled_by?: string
  canceled_at?: Date
  items: LineItem[]
  payment_collection_id: string
  payment_collection: PaymentCollection
  shipping_total: number
  discount_total: number
  tax_total: number | null
  total: number
  subtotal: number
  gift_card_total: number
  gift_card_tax_total: number
  difference_due: number
  status: OrderEditStatus
  loadStatus(): void
}

enum PaymentCollectionStatus {
  NOT_PAID = 'not_paid',
  AWAITING = 'awaiting',
  AUTHORIZED = 'authorized',
  PARTIALLY_AUTHORIZED = 'partially_authorized',
  CANCELED = 'canceled',
}

enum PaymentCollectionType {
  ORDER_EDIT = 'order_edit',
}

type PaymentCollection = SoftDeletableEntity & {
  type: PaymentCollectionType
  status: PaymentCollectionStatus
  description: string | null
  amount: number
  authorized_amount: number | null
  region_id: string
  region: Region
  currency_code: string
  currency: Currency
  payment_sessions: PaymentSession[]
  payments: Payment[]
  metadata: Record<string, unknown>
  created_by: string
}

enum SwapFulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
  PARTIALLY_SHIPPED = 'partially_shipped',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

enum SwapPaymentStatus {
  NOT_PAID = 'not_paid',
  AWAITING = 'awaiting',
  CAPTURED = 'captured',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  DIFFERENCE_REFUNDED = 'difference_refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  REQUIRES_ACTION = 'requires_action',
}

export type Swap = {
  fulfillment_status: SwapFulfillmentStatus
  payment_status: SwapPaymentStatus
  order_id: string
  order: Order
  additional_items: LineItem[]
  return_order: Return
  fulfillments: Fulfillment[]
  payment: Payment
  difference_due: number
  shipping_address_id: string
  shipping_address: Address
  shipping_methods: ShippingMethod[]
  cart_id: string
  cart: Cart
  confirmed_at: Date
  canceled_at: Date
  no_notification: boolean
  allow_backorder: boolean
  idempotency_key: string
  metadata: Record<string, unknown>
}

type FulfillmentItem = {
  fulfillment_id: string
  item_id: string
  fulfillment: Fulfillment
  item: LineItem
  quantity: number
}

type TrackingLink = SoftDeletableEntity & {
  url: string
  tracking_number: string
  fulfillment_id: string
  fulfillment: Fulfillment
  idempotency_key: string
  metadata: Record<string, unknown>
}

type Fulfillment = BaseEntity & {
  claim_order_id: string
  claim_order: ClaimOrder
  swap_id: string
  swap: Swap
  order_id: string
  order: Order
  no_notification: boolean
  provider_id: string
  location_id: string | null
  provider: FulfillmentProvider
  items: FulfillmentItem[]
  tracking_links: TrackingLink[]
  tracking_numbers: string[]
  data: Record<string, unknown>
  shipped_at: Date
  canceled_at: Date
  metadata: Record<string, unknown>
  idempotency_key: string
}

enum ReturnStatus {
  REQUESTED = 'requested',
  RECEIVED = 'received',
  REQUIRES_ACTION = 'requires_action',
  CANCELED = 'canceled',
}

type ReturnReason = SoftDeletableEntity & {
  value: string
  label: string
  description: string
  parent_return_reason_id: string | null
  parent_return_reason: ReturnReason | null
  return_reason_children: ReturnReason[]
  metadata: Record<string, unknown>
}

type ReturnItem = {
  return_id: string
  item_id: string
  return_order: Return
  item: LineItem
  quantity: number
  is_requested: boolean
  requested_quantity: number
  received_quantity: number
  reason_id: string
  reason: ReturnReason
  note: string
  metadata: Record<string, unknown>
}

export type Return = {
  status: ReturnStatus
  items: ReturnItem[]
  swap_id: string | null
  swap: Swap
  claim_order_id: string | null
  claim_order: ClaimOrder
  order_id: string | null
  order: Order
  shipping_method: ShippingMethod
  location_id: string | null
  shipping_data: Record<string, unknown>
  refund_amount: number
  received_at: Date
  no_notification: boolean | null
  metadata: Record<string, unknown> | null
  idempotency_key: string | null
}

export type ClaimOrder = {
  payment_status: ClaimPaymentStatus
  fulfillment_status: ClaimFulfillmentStatus
  claim_items: ClaimItem[]
  additional_items: LineItem[]
  type: ClaimType
  order_id: string
  order: Order
  return_order: Return
  shipping_address_id: string
  shipping_address: Address
  shipping_methods: ShippingMethod[]
  fulfillments: Fulfillment[]
  refund_amount: number
  canceled_at: Date
  created_at: Date
  updated_at: Date
  deleted_at: Date
  no_notification: boolean
  metadata: Record<string, unknown>
  idempotency_key: string
}

type ShippingMethodTaxLine = TaxLine & {
  shipping_method_id: string
  shipping_method: ShippingMethod
}

type ShippingMethod = {
  id: string
  shipping_option_id: string
  order_id: string
  order: Order
  claim_order_id: string | null
  claim_order: ClaimOrder
  cart_id: string
  cart: Cart
  swap_id: string
  swap: Swap
  return_id: string
  return_order: Return
  shipping_option: ShippingOption
  tax_lines: ShippingMethodTaxLine[]
  price: number
  data: Record<string, unknown>
  includes_tax: boolean
  subtotal?: number
  total?: number
  tax_total?: number
}

export type Order = BaseEntity & {
  status: OrderStatus
  fulfillment_status: FulfillmentStatus
  payment_status: PaymentStatus
  display_id: number
  cart_id: string
  cart: Cart
  customer_id: string
  customer: Customer
  email: string
  billing_address_id: string
  billing_address: Address
  shipping_address_id: string
  shipping_address: Address
  region_id: string
  region: Region
  currency_code: string
  currency: Currency
  tax_rate: number | null
  discounts: Discount[]
  gift_cards: GiftCard[]
  shipping_methods: ShippingMethod[]
  payments: Payment[]
  fulfillments: Fulfillment[]
  returns: Return[]
  claims: ClaimOrder[]
  refunds: Refund[]
  swaps: Swap[]
  draft_order_id: string
  draft_order: DraftOrder
  edits: OrderEdit[]
  items: LineItem[]
  gift_card_transactions: GiftCardTransaction[]
  canceled_at: Date
  metadata: Record<string, unknown>
  no_notification: boolean
  idempotency_key: string
  external_id: string | null
  sales_channel_id: string | null
  sales_channel: SalesChannel
  shipping_total: number
  discount_total: number
  tax_total: number | null
  refunded_total: number
  total: number
  subtotal: number
  paid_total: number
  refundable_amount: number
  gift_card_total: number
  gift_card_tax_total: number
}

export declare class GiftCardTransaction {
  id: string
  gift_card_id: string
  gift_card: GiftCard
  order_id: string
  order: Order
  amount: number
  created_at: Date
  is_taxable: boolean
  tax_rate: number | null
}

enum DraftOrderStatus {
  OPEN = 'open',
  COMPLETED = 'completed',
}

type DraftOrder = BaseEntity & {
  status: DraftOrderStatus
  display_id: number
  cart_id: string
  cart: Cart
  order_id: string
  order: Order
  canceled_at: Date
  completed_at: Date
  no_notification_order: boolean
  metadata: Record<string, unknown>
  idempotency_key: string
}

type Refund = BaseEntity & {
  order_id: string
  payment_id: string
  order: Order
  payment: Payment
  amount: number
  note: string
  reason: string
  metadata: Record<string, unknown>
  idempotency_key: string
}

export type Customer = SoftDeletableEntity & {
  email: string
  first_name: string
  last_name: string
  billing_address_id: string | null
  billing_address: Address
  shipping_addresses: Address[]
  password: string
  phone: string
  has_account: boolean
  orders: Order[]
  groups: CustomerGroup[]
  metadata: Record<string, unknown>
}

type CustomerGroup = SoftDeletableEntity & {
  name: string
  customers: Customer[]
  price_lists: PriceList[]
  metadata: Record<string, unknown>
}

export type PriceList = SoftDeletableEntity & {
  name: string
  description: string
  type: PriceListType
  status: PriceListStatus
  starts_at: Date | null
  ends_at: Date | null
  customer_groups: CustomerGroup[]
  prices: MoneyAmount[]
  includes_tax: boolean
}

export type MoneyAmount = SoftDeletableEntity & {
  currency_code: string
  currency?: Currency
  amount: number
  min_quantity: number | null
  max_quantity: number | null
  price_list_id: string | null
  price_list: PriceList | null
  variant_id: string
  variant: ProductVariant
  region_id: string
  region?: Region
}

export type ProductVariant = SoftDeletableEntity & {
  title: string
  product_id: string
  product: Product
  prices: MoneyAmount[]
  sku: string
  barcode: string
  ean: string
  upc: string
  variant_rank: number
  inventory_quantity: number
  allow_backorder: boolean
  manage_inventory: boolean
  hs_code: string
  origin_country: string
  mid_code: string
  material: string
  weight: number
  length: number
  height: number
  width: number
  options: ProductOptionValue[]
  inventory_items: ProductVariantInventoryItem[]
  metadata: Record<string, unknown>
}

type ProductVariantInventoryItem = SoftDeletableEntity & {
  inventory_item_id: string
  variant_id: string
  variant: ProductVariant
  required_quantity: number
}

export type ProductOptionValue = BaseEntity & {
  value: string
  option_id: string
  option: ProductOption
  variant_id: string
  variant: ProductVariant
  metadata: Record<string, unknown>
}

export type ProductOption = SoftDeletableEntity & {
  title: string
  values: ProductOptionValue[]
  product_id: string
  product: Product
  metadata: Record<string, unknown>
}

export type Product = SoftDeletableEntity & {
  title: string
  subtitle: string | null
  description: string | null
  handle: string | null
  is_giftcard: boolean
  status: ProductStatus
  images: Image[]
  thumbnail: string | null
  options: ProductOption[]
  variants: ProductVariant[]
  categories: ProductCategory[]
  profile_id: string
  profile: ShippingProfile
  weight: number | null
  length: number | null
  height: number | null
  width: number | null
  hs_code: string | null
  origin_country: string | null
  mid_code: string | null
  material: string | null
  collection_id: string | null
  collection: ProductCollection
  type_id: string | null
  type: ProductType
  tags: ProductTag[]
  discountable: boolean
  external_id: string | null
  metadata: Record<string, unknown> | null
  sales_channels: SalesChannel[]
}

export type ProductCategory = SoftDeletableEntity & {
  name: string
  handle: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  is_active: Boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  is_internal: Boolean
  parent_category: ProductCategory | null
  parent_category_id: string | null
  category_children: ProductCategory[]
  products: Product[]
}

export interface HTTPResponse extends Response {
  status: number
  statusText: string
  headers: Record<string, string> & {
    'set-cookie'?: string[]
  } & Headers
  config: any
  request?: any
}

export type ApiResponse<T> = T & HTTPResponse

export type ResponsePromise<T = any> = Promise<ApiResponse<T>>

export interface Products extends PaginatedResponse {
  products: Product[]
  count: number
}

export interface ProductTypes extends PaginatedResponse {
  product_types: ProductType[]
}

export interface ProductCollections extends PaginatedResponse {
  collections: ProductCollection[]
}

export interface ShippingOptions extends PaginatedResponse {
  shipping_options: ShippingOption[]
}

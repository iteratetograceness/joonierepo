var ProductStatus;
(function (ProductStatus) {
    ProductStatus["DRAFT"] = "draft";
    ProductStatus["PROPOSED"] = "proposed";
    ProductStatus["PUBLISHED"] = "published";
    ProductStatus["REJECTED"] = "rejected";
})(ProductStatus || (ProductStatus = {}));
var CartType;
(function (CartType) {
    CartType["DEFAULT"] = "default";
    CartType["SWAP"] = "swap";
    CartType["DRAFT_ORDER"] = "draft_order";
    CartType["PAYMENT_LINK"] = "payment_link";
    CartType["CLAIM"] = "claim";
})(CartType || (CartType = {}));
var PriceListType;
(function (PriceListType) {
    PriceListType["SALE"] = "sale";
    PriceListType["OVERRIDE"] = "override";
})(PriceListType || (PriceListType = {}));
var PriceListStatus;
(function (PriceListStatus) {
    PriceListStatus["ACTIVE"] = "active";
    PriceListStatus["DRAFT"] = "draft";
})(PriceListStatus || (PriceListStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["ARCHIVED"] = "archived";
    OrderStatus["CANCELED"] = "canceled";
    OrderStatus["REQUIRES_ACTION"] = "requires_action";
})(OrderStatus || (OrderStatus = {}));
var FulfillmentStatus;
(function (FulfillmentStatus) {
    FulfillmentStatus["NOT_FULFILLED"] = "not_fulfilled";
    FulfillmentStatus["PARTIALLY_FULFILLED"] = "partially_fulfilled";
    FulfillmentStatus["FULFILLED"] = "fulfilled";
    FulfillmentStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    FulfillmentStatus["SHIPPED"] = "shipped";
    FulfillmentStatus["PARTIALLY_RETURNED"] = "partially_returned";
    FulfillmentStatus["RETURNED"] = "returned";
    FulfillmentStatus["CANCELED"] = "canceled";
    FulfillmentStatus["REQUIRES_ACTION"] = "requires_action";
})(FulfillmentStatus || (FulfillmentStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["NOT_PAID"] = "not_paid";
    PaymentStatus["AWAITING"] = "awaiting";
    PaymentStatus["CAPTURED"] = "captured";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["CANCELED"] = "canceled";
    PaymentStatus["REQUIRES_ACTION"] = "requires_action";
})(PaymentStatus || (PaymentStatus = {}));
var ShippingProfileType;
(function (ShippingProfileType) {
    ShippingProfileType["DEFAULT"] = "default";
    ShippingProfileType["GIFT_CARD"] = "gift_card";
    ShippingProfileType["CUSTOM"] = "custom";
})(ShippingProfileType || (ShippingProfileType = {}));
var ShippingOptionPriceType;
(function (ShippingOptionPriceType) {
    ShippingOptionPriceType["FLAT_RATE"] = "flat_rate";
    ShippingOptionPriceType["CALCULATED"] = "calculated";
})(ShippingOptionPriceType || (ShippingOptionPriceType = {}));
var RequirementType;
(function (RequirementType) {
    RequirementType["MIN_SUBTOTAL"] = "min_subtotal";
    RequirementType["MAX_SUBTOTAL"] = "max_subtotal";
})(RequirementType || (RequirementType = {}));
var DiscountRuleType;
(function (DiscountRuleType) {
    DiscountRuleType["FIXED"] = "fixed";
    DiscountRuleType["PERCENTAGE"] = "percentage";
    DiscountRuleType["FREE_SHIPPING"] = "free_shipping";
})(DiscountRuleType || (DiscountRuleType = {}));
var AllocationType;
(function (AllocationType) {
    AllocationType["TOTAL"] = "total";
    AllocationType["ITEM"] = "item";
})(AllocationType || (AllocationType = {}));
var DiscountConditionType;
(function (DiscountConditionType) {
    DiscountConditionType["PRODUCTS"] = "products";
    DiscountConditionType["PRODUCT_TYPES"] = "product_types";
    DiscountConditionType["PRODUCT_COLLECTIONS"] = "product_collections";
    DiscountConditionType["PRODUCT_TAGS"] = "product_tags";
    DiscountConditionType["CUSTOMER_GROUPS"] = "customer_groups";
})(DiscountConditionType || (DiscountConditionType = {}));
var DiscountConditionOperator;
(function (DiscountConditionOperator) {
    DiscountConditionOperator["IN"] = "in";
    DiscountConditionOperator["NOT_IN"] = "not_in";
})(DiscountConditionOperator || (DiscountConditionOperator = {}));
var ClaimType;
(function (ClaimType) {
    ClaimType["REFUND"] = "refund";
    ClaimType["REPLACE"] = "replace";
})(ClaimType || (ClaimType = {}));
var ClaimPaymentStatus;
(function (ClaimPaymentStatus) {
    ClaimPaymentStatus["NA"] = "na";
    ClaimPaymentStatus["NOT_REFUNDED"] = "not_refunded";
    ClaimPaymentStatus["REFUNDED"] = "refunded";
})(ClaimPaymentStatus || (ClaimPaymentStatus = {}));
var ClaimFulfillmentStatus;
(function (ClaimFulfillmentStatus) {
    ClaimFulfillmentStatus["NOT_FULFILLED"] = "not_fulfilled";
    ClaimFulfillmentStatus["PARTIALLY_FULFILLED"] = "partially_fulfilled";
    ClaimFulfillmentStatus["FULFILLED"] = "fulfilled";
    ClaimFulfillmentStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    ClaimFulfillmentStatus["SHIPPED"] = "shipped";
    ClaimFulfillmentStatus["PARTIALLY_RETURNED"] = "partially_returned";
    ClaimFulfillmentStatus["RETURNED"] = "returned";
    ClaimFulfillmentStatus["CANCELED"] = "canceled";
    ClaimFulfillmentStatus["REQUIRES_ACTION"] = "requires_action";
})(ClaimFulfillmentStatus || (ClaimFulfillmentStatus = {}));
var ClaimReason;
(function (ClaimReason) {
    ClaimReason["MISSING_ITEM"] = "missing_item";
    ClaimReason["WRONG_ITEM"] = "wrong_item";
    ClaimReason["PRODUCTION_FAILURE"] = "production_failure";
    ClaimReason["OTHER"] = "other";
})(ClaimReason || (ClaimReason = {}));
var PaymentCollectionStatus;
(function (PaymentCollectionStatus) {
    PaymentCollectionStatus["NOT_PAID"] = "not_paid";
    PaymentCollectionStatus["AWAITING"] = "awaiting";
    PaymentCollectionStatus["AUTHORIZED"] = "authorized";
    PaymentCollectionStatus["PARTIALLY_AUTHORIZED"] = "partially_authorized";
    PaymentCollectionStatus["CANCELED"] = "canceled";
})(PaymentCollectionStatus || (PaymentCollectionStatus = {}));
var PaymentCollectionType;
(function (PaymentCollectionType) {
    PaymentCollectionType["ORDER_EDIT"] = "order_edit";
})(PaymentCollectionType || (PaymentCollectionType = {}));
var SwapFulfillmentStatus;
(function (SwapFulfillmentStatus) {
    SwapFulfillmentStatus["NOT_FULFILLED"] = "not_fulfilled";
    SwapFulfillmentStatus["FULFILLED"] = "fulfilled";
    SwapFulfillmentStatus["SHIPPED"] = "shipped";
    SwapFulfillmentStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    SwapFulfillmentStatus["CANCELED"] = "canceled";
    SwapFulfillmentStatus["REQUIRES_ACTION"] = "requires_action";
})(SwapFulfillmentStatus || (SwapFulfillmentStatus = {}));
var SwapPaymentStatus;
(function (SwapPaymentStatus) {
    SwapPaymentStatus["NOT_PAID"] = "not_paid";
    SwapPaymentStatus["AWAITING"] = "awaiting";
    SwapPaymentStatus["CAPTURED"] = "captured";
    SwapPaymentStatus["CONFIRMED"] = "confirmed";
    SwapPaymentStatus["CANCELED"] = "canceled";
    SwapPaymentStatus["DIFFERENCE_REFUNDED"] = "difference_refunded";
    SwapPaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
    SwapPaymentStatus["REFUNDED"] = "refunded";
    SwapPaymentStatus["REQUIRES_ACTION"] = "requires_action";
})(SwapPaymentStatus || (SwapPaymentStatus = {}));
var ReturnStatus;
(function (ReturnStatus) {
    ReturnStatus["REQUESTED"] = "requested";
    ReturnStatus["RECEIVED"] = "received";
    ReturnStatus["REQUIRES_ACTION"] = "requires_action";
    ReturnStatus["CANCELED"] = "canceled";
})(ReturnStatus || (ReturnStatus = {}));
var DraftOrderStatus;
(function (DraftOrderStatus) {
    DraftOrderStatus["OPEN"] = "open";
    DraftOrderStatus["COMPLETED"] = "completed";
})(DraftOrderStatus || (DraftOrderStatus = {}));
export {};

export enum ErrorCode {
	INSUFFICIENT_INVENTORY = 'insufficient_inventory'
}

export enum ErrorType {
	NOT_ALLOWED = 'not_allowed'
}

export enum ClientError {
	NO_CART_FOUND = 'no_cart_found',
	NO_USER_FOUND = 'no_user_found',
	MISSING_LINE_ITEM_ID = 'mising_line_item_id',
	MISSING_QUANTITY = 'missing_quantity',
	MISSING_SHIPPING_OPTION_ID = 'missing_shipping_option_id',
	MISSING_ORDER_ID = 'missing_order_id',
	MISSING_EMAIL = 'missing_email',
	MISSING_PASSWORD = 'missing_password',
	MISSING_TOKEN = 'missing_token',
	MISSING_QUERY = 'missing_query'
}

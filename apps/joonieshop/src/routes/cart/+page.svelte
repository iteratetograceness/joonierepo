<script>
	import { cart, cartQuantity, cartTotal } from "$stores/cart";
	import { parsePrice } from "$utils/common/parsePrice";

    $: itemsInCart = $cart?.items || [];
</script>

<section class="py-10 max-w-96">
    {#if $cartQuantity === 0}
        <p>your cart is empty!</p>
    {:else}
        {#each itemsInCart as item}
            <p>{item.title.toLowerCase()} / {item.description?.toLowerCase()} ({item.quantity}) — ${parsePrice(item.unit_price)}</p>
            <!-- TODO: remove, update line item -->
        {/each}
        <p>subtotal: ${parsePrice($cartTotal.subtotal)}</p>
        {#if $cartTotal.discount_total}<p>discount: -{$cartTotal.discount_total}</p>{/if}
        <p>tax: ${$cartTotal.tax_total}</p>
        <!-- TODO: if IP is in canada, estimated shipping $5, if US free -->
        <p>total: ${parsePrice($cartTotal.total)}</p>
        <a href="/checkout">checkout</a>
    {/if}
</section>

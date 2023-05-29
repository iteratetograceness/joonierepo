<script>
	import { cart, cartQuantity, cartTotal } from "$stores/cart";
	import { parsePrice } from "$utils/common/parsePrice";

    $: itemsInCart = $cart?.items || [];
</script>

<section class="my-10 py-5 max-w-96 border-t-2 w-full md:w-1/2">
    {#if $cartQuantity === 0}
        <p>your cart is empty!</p>
    {:else}
        <div class="flex justify-between w-full mb-5">
            <p class="font-bold">item (quantity)</p>
            <p class="font-bold">price</p>
        </div>
        {#each itemsInCart as item}
        <span class="flex gap-2 mb-4">
            <!-- remove btn -->
            <button class="border border-brown rounded-full px-1 text-center text-xs">X</button>
            <div class="flex w-full gap-1">
                <p>{item.title.toLowerCase()} ({item.quantity})</p>
                <button class="border border-brown rounded-full px-2 text-sm">edit</button>
                <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                <p>${parsePrice(item.unit_price)}</p>
            </div>
        </span>
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

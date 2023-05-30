<script>
	import { cart, cartQuantity, cartTotal, removeFromCart } from "$stores/cart";
	import { parsePrice } from "$utils/common/parsePrice";

    console.log($cart)
    $: itemsInCart = $cart?.items || [];

    const removeItem = (/** @type {string} */ itemId) => {
        removeFromCart(itemId);
    };
</script>

<section class="my-10 py-5 max-w-96 border-t-[1px] border-brown w-full md:w-1/2">
    {#if $cartQuantity === 0}
        <p>your cart is empty!</p>
    {:else}
        <div class="flex justify-between w-full mb-5">
            <p class="font-bold">item (quantity)</p>
            <p class="font-bold">price</p>
        </div>
        {#each itemsInCart as item}
        <span class="flex gap-2 mb-4">
            <button 
                class="border border-brown rounded-full px-1 text-center text-xs"
                on:click={() => removeItem(item.id)}
            >
                X
            </button>
            <div class="flex w-full gap-1">
                <p>{item.title.toLowerCase()} ({item.quantity})</p>
                <button class="border border-brown rounded-full px-2 text-sm">edit</button>
                <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                <p>${parsePrice(item.unit_price)}</p>
            </div>
        </span>
        {/each}
        <div class="mt-6 flex flex-col">
            <div class="flex justify-between w-full mb-2 gap-1">
                <p class="font-bold">subtotal</p>
                <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                <p class="font-bold">${parsePrice($cartTotal.subtotal)}</p>
            </div>

            {#if $cartTotal.discount_total}
                <div class="flex justify-between w-full mb-2 gap-1">
                    <p class="font-bold">discount</p>
                    <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                    <p class="font-bold">-${parsePrice($cartTotal.discount_total)}</p>
                </div>
            {/if}

            <div class="flex justify-between w-full mb-2 gap-1">
                <p class="font-bold">tax</p>
                <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                <p class="font-bold">${parsePrice($cartTotal.tax_total)}</p>
            </div>

            <!-- TODO: if IP is in canada, estimated shipping $5, if US free -->
            <div class="flex justify-between w-full mb-2 gap-1">
                <p class="font-bold">estimated shipping</p>
                <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                <p class="font-bold">${parsePrice($cartTotal.tax_total)}</p>
            </div>

            <div class="flex justify-between w-full mb-2 gap-1">
                <p class="font-bold">total</p>
                <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                <p class="font-bold">${parsePrice($cartTotal.total)}</p>
            </div>

            <a href="/checkout">checkout</a>
        </div>
        
    {/if}
</section>

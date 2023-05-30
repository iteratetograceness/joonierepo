<script>
	import { cart, cartQuantity, cartTotal, removeFromCart, updateCart } from "$stores/cart";
	import { parsePrice } from "$utils/common/parsePrice";
    import QuantitySelector from '$components/QuantitySelector.svelte';
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

    $: itemsInCart = $cart?.items || [];

    const removeItem = (/** @type {string} */ itemId) => {
        removeFromCart(itemId);
    };

    const updateItem = (/** @type {string} */ itemId, /** @type {number} */ quantity) => {
        updateCart(itemId, quantity);
        closeEditModal();
    }

    let showEditModal = false;
    let editModalData = {
        productId: "",
        productName: "",
        productQuantity: 0,
    };

    const openEditModal = (/** @type {any} */ id, /** @type {any} */ name, /** @type {any} */ quantity) => {
        if (showEditModal) return;

        editModalData = {
            productId: id,
            productName: name,
            productQuantity: quantity,
        }

        showEditModal = true;
    }

    const closeEditModal = () => {
        showEditModal = false;
        editModalData = {
            productId: "",
            productName: "",
            productQuantity: 0,
        }
    }

    const updateTempQuantity = (/** @type {number} */ count, /** @type {string | undefined} */ type) => {
        if (!type) {
            editModalData.productQuantity = count;
            return;
        }

        if (type === 'increment') {
            editModalData.productQuantity += 1;
        } else if (type === 'decrement') {
            editModalData.productQuantity -= 1;
        }
    }

    let estimatedShippingCost = 500;

    onMount(() => {
        const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (location.startsWith("America")) {
            estimatedShippingCost = 0;
        } else if (location.startsWith("Canada")) {
            estimatedShippingCost = 500;
        }
    })
</script>

<section class="flex gap-4 my-10 py-5 max-w-96 border-t-[1px] border-brown w-full">
    {#if $cartQuantity === 0}
        <p>your cart is empty!</p>
    {:else}
        <div class="w-full md:w-1/2">
            <div class="flex justify-between  mb-5">
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
                    <button 
                        class="border border-brown rounded-full px-2 text-sm"
                        on:click={() => openEditModal(item.id, item.title, item.quantity)}
                    >
                        edit
                    </button>
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

                <div class="flex justify-between w-full mb-2 gap-1">
                    <p class="font-bold">estimated shipping</p>
                    <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                    <p class="font-bold">${parsePrice(estimatedShippingCost)}</p>
                </div>

                <div class="flex justify-between w-full mb-2 gap-1">
                    <p class="font-bold">estimated total</p>
                    <hr class="h-px bg-brown self-end inherit border-0 flex-1 mb-1">
                    <p class="font-bold">${parsePrice($cartTotal.total + estimatedShippingCost)}</p>
                </div>

                <div class="flex gap-6 mt-6 text-center">
                    <a class="w-full rounded-xl bg-brown text-light py-2 px-6 flex-1" href="/checkout">checkout</a>
                    <a class="rounded-xl border-brown border-[1px] py-2 px-6 flex-1" href="/">continue shopping</a>
                </div>
            </div>
        </div>
        {#if showEditModal}
        <div in:fade={{ duration: 250 }} out:fade={{ duration: 100 }} class="flex flex-col gap-6 items-center justify-center flex-1 absolute left-0 right-0 mx-auto bg-light md:relative p-6 w-4/5 h-3/5 md:w-full border-[1px] rounded-xl border-brown">
                <p class="font-bold">{editModalData.productName.toLowerCase()}</p>
                <QuantitySelector
                    focusInputOnMount
                    count={editModalData.productQuantity}
                    increment={() => updateTempQuantity(1, 'increment')}
                    decrement={() => updateTempQuantity(1, 'decrement')}
                    update={(quantity) => updateTempQuantity(quantity)}
                    max={10}
                />
                <div class="flex gap-3">
                    <button class="rounded-xl bg-brown text-light py-2 px-6" on:click={() => updateItem(editModalData.productId, editModalData.productQuantity)}>update</button>    
                    <button class="rounded-xl border-brown border-[1px] py-2 px-6" on:click={closeEditModal}>cancel</button>
                </div>
        </div>
    {/if}
    {/if}
</section>

<script>
    import { cartQuantity } from '$stores/cart';
    import Icons from '$components/Icons.svelte';
    import { handleStoreCart } from '$stores/cart';
  
    const openCart = async () => {
        await handleStoreCart();
    };
  </script>

<a class="inline-flex items-center self-end gap-2 md:self-start font-libre" href="/cart" on:click={openCart}>
    <span class="hidden md:block">cart</span>
    <span class="block md:hidden"><Icons type="cart" /></span>
    ({$cartQuantity || 0})
</a>
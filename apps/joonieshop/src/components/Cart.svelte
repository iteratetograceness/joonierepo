<script>
	import { cartQuantity } from '$stores/cart';
	import Icons from '$components/Icons.svelte';
</script>

<a class="inline-flex items-center gap-2 self-end font-libre md:self-start" href="/cart">
	<span class="hidden md:block">cart</span>
	<span class="block md:hidden"><Icons type="cart" /></span>
	({$cartQuantity})
</a>

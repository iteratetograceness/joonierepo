<script lang="ts">
    import LoginOrRegister from "$components/checkout/LoginOrRegister.svelte";
	import { cart, shippingOptions, getShippingOptions } from "$stores/cart";
	import { checkout, updateCheckout } from "$stores/checkout";
	import { onMount } from "svelte";
	import { is_empty } from "svelte/internal";

    export let data;

    const steps = [
        {
            title: "Contact",
            completed: $cart?.email !== null,
            children: LoginOrRegister,
        },
        {
            title: "Address",
            completed: !is_empty($cart?.shipping_address?.address_1),
            children: LoginOrRegister,
        },
        {
            title: "Shipping",
            completed: !is_empty($cart?.shipping_methods),
            children: LoginOrRegister,
        },
        {
            title: "Payment",
            completed: false,
            children: LoginOrRegister,
        },
    ]

    onMount(async () => {
        await getShippingOptions();
    });
</script>

<section>
    checkout
</section>
<script>
  import Icons from './Icons.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let loading = false;
  export let items = [];
  function addOneItem(item, i) {
    loading = true;
    dispatch('addProduct', {
      body: item.node.merchandise.id
    });
  }
  function removeOneItem(item, i) {
    loading = true;
    let quantity = item.node.quantity - 1;
    dispatch('removeProduct', {
      body: {
        variantId: item.node.merchandise.id,
        quantity: quantity,
        lineId: item.node.id
      }
    });
  }
  function removeEntireItem(item, i) {
    loading = true;
    dispatch('removeProduct', {
      body: {
        variantId: item.node.merchandise.id,
        quantity: 0,
        lineId: item.node.id
      }
    });
  }
  async function checkout() {
    loading = true;
    let checkoutUrl = localStorage.getItem('cartUrl');
    window.open(JSON.parse(checkoutUrl), '_blank');
    loading = false;
  }
</script>

<div
  on:click|self
  class="absolute inset-0 z-50 flex justify-end w-full max-h-screen overflow-hidden bg-black/50"
>
  <div class="relative z-50 w-full p-6 bg-black md:w-1/2 lg:w-1/3">
    {#if loading}
      <div class="absolute inset-0 z-50 bg-black/50" />
    {/if}
    <div class="flex items-center justify-between w-full mb-6">
      <div class="text-2xl font-medium">My Cart</div>
      <button on:click class="text-sm uppercase opacity-80 hover:opacity-100">close</button>
    </div>
    {#if items.length === 0}
      <div class="flex flex-col items-center justify-center w-full mt-20 overflow-hidden">
        <div class="flex items-center justify-center w-16 h-16 bg-white rounded-full">
          <Icons type="cart" strokeColor="#000" />
        </div>
        <div class="mt-6 text-2xl font-bold text-center">Your cart is empty.</div>
      </div>
    {/if}
    <div class="overflow-y-auto" style="height: 80%;">
      {#each items as item, i (i)}
        <div class="flex w-full mb-2">
          <img
            alt={item.node.merchandise.product.title}
            decoding="async"
            loading="lazy"
            class="flex-none w-20 bg-white"
            src={item.node.merchandise.product.images.edges[0].node.originalSrc}
          />
          <div class="flex flex-col justify-between w-full ml-4">
            <div class="flex justify-between w-full">
              <di>
                <p class="text-lg font-medium">{item.node.merchandise.product.title}</p>
                <p class="text-sm">{item.node.merchandise.title}</p>
              </di>
              <p class="font-medium">${item.node.estimatedCost.totalAmount.amount}</p>
            </div>
          </div>
        </div>
        <div class="flex w-full mb-4">
          <button
            on:click={() => {
              removeEntireItem(item, i);
            }}
            class="flex items-center justify-center w-8 h-8 mr-2 border border-white/40 bg-white/0 hover:bg-white/10"
          >
            <Icons type="close" strokeColor="#fff" />
          </button>
          <div class="flex w-full h-8 border border-white/40">
            <div class="flex items-center h-full px-2 ">
              {item.node.quantity}
            </div>
            <button
              on:click={() => {
                removeOneItem(item, i);
              }}
              class="flex items-center justify-center w-8 h-8 ml-auto border-l border-white/40 bg-white/0 hover:bg-white/10"
            >
              <Icons type="minus" strokeColor="#fff" />
            </button>
            <button
              on:click={() => {
                addOneItem(item, i);
              }}
              class="flex items-center justify-center w-8 h-8 border-l border-white/40 bg-white/0 hover:bg-white/10"
            >
              <Icons type="plus" strokeColor="#fff" />
            </button>
          </div>
        </div>
      {/each}
    </div>
    {#if items.length !== 0}
      <button
        on:click={checkout}
        class="flex items-center justify-center w-full p-3 mt-6 text-sm font-medium text-black uppercase bg-white opacity-90 hover:opacity-100"
      >
        <span>Proceed to Checkout</span>
        {#if loading}
          <div class="ml-4 lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        {/if}
      </button>
    {/if}
  </div>
</div>

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

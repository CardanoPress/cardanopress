<template x-if='!isConnected'>
    <button type='button' disabled='true'>Delegate</button>
</template>

<template x-if='isConnected && !transactionHash'>
    <button type='button' @click='handleDelegation()' x-bind:disabled='isProcessing'>Delegate</button>
</template>

<template x-if='isConnected && transactionHash'>
    <button type='button' disabled='true'>Delegated</button>
</template>

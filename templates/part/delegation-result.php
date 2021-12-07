<template x-if='isConnected && !isProcessing && !transactionHash'>
    <p>Waiting for delegation</p>
</template>

<template x-if='isConnected && isProcessing'>
    <p>Confirming transaction</p>
</template>

<template x-if='isConnected && !isProcessing && transactionHash'>
    <p x-text='transactionHash'></p>
</template>

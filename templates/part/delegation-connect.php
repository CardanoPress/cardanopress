<template x-if='!isConnected'>
    <button type='button' @click='showModal = true'>Connect</button>
</template>

<template x-if='isConnected'>
    <button type='button' disabled='true'>Connected</button>
</template>

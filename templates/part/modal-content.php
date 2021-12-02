<div class="px-6 py-4">
    <button x-on:click.prevent='isConnected ? handleReconnect() : handleConnect()' x-bind:disabled="isDisabled()">
        Nami

        <template x-if="!isAvailable">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>
</div>

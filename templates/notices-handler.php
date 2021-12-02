<div class="fixed inset-0 flex flex-col items-end justify-start pointer-events-none z-50">
    <div class="max-w-xs m-6 flex flex-col items-end">
        <template x-for="notice of $store.truNotification.list" :key="notice.id">
            <div
                x-show="$store.truNotification.visible.includes(notice)"
                x-transition:enter="transition ease-in duration-200"
                x-transition:enter-start="transform opacity-0 translate-x-40"
                x-transition:enter-end="transform opacity-100"
                x-transition:leave="transition ease-out duration-500"
                x-transition:leave-start="transform translate-x-0 opacity-100"
                x-transition:leave-end="transform translate-x-full opacity-0"
                @click="$store.truNotification.remove(notice.id)" class="z-10"
            >
                <?php namiPress()->template('part/notice-item'); ?>
            </div>
        </template>
    </div>
</div>

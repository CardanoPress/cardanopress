<div class="relative z-10">
    <?php namiPress()->template('part/menu-button'); ?>

    <ul
        class="list-none pl-0 mt-2 w-40 py-1 bg-white absolute shadow rounded"
        x-show="openDropdown"
        x-transition:enter="transition ease-out duration-150 origin-top"
        x-transition:enter-start="transform opacity-0 scale-y-0"
        x-transition:enter-end="transform opacity-100"
        x-transition:leave="transition ease-in duration-75 origin-top"
        x-transition:leave-start="transform opacity-100"
        x-transition:leave-end="transform opacity-0 scale-y-0"
        @click.away="openDropdown = false"
    >
        <?php namiPress()->template('part/menu-items'); ?>
    </ul>
</div>

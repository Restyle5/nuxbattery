<template>
    <div class="container mt-4 d-flex flex-column">
        <!-- Load table of content -->
        <FormBatteryPaginatedTable />

    </div>
</template>

<script setup>
definePageMeta({
    middleware: "auth",
});
</script>

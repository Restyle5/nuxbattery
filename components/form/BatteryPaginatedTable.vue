<template>
    <div class="battery-table">

        <!-- Search Input -->
        <span class="filter-block d-flex justify-content-between">
            <div class="mb-3">
                <input type="text" class="form-control" v-model="searchQuery" placeholder="Search battery..." />
            </div>
            <div class="mb-3">
                <a class="btn btn-primary mb-2 float-end" href="/battery/new">+ Add
                    battery</a>
            </div>
        </span>

        <!-- table of content -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th v-for="(column, key) in columns" :key="key" @click="sortBy(key)" class="sortable">
                            {{ column }}
                            <span v-if="sortColumn === key">
                                <Icon v-if="sortOrder === 'asc'" name="i-lucide-chevron-up" />
                                <Icon v-else name="i-lucide-chevron-down" />
                            </span>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.brand }}</td>
                        <td>{{ item.model }}</td>
                        <td>{{ item.voltage }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.warranty }}</td>
                        <td>
                            <NuxtLink :to="`/battery/edit/${item.id}`" class="text-primary">
                                <Icon name="i-lucide-pencil" />
                                Edit
                            </NuxtLink>,
                            <span class="icon text-danger" @click="deleteItem(item.id)">
                                <Icon name="i-lucide-trash" />
                                Delete
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Controls -->
        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage">Previous</button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <button class="page-link" @click="setPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="nextPage">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script setup>
import { ref, computed, watchEffect } from "vue";
import { useBattery } from "@/composables/useBattery";
import './BatteryPaginatedTable.css'

const { getBatteries, deleteBattery } = useBattery();

const columns = {
    id: "ID",
    brand: "Brand",
    model: "Model",
    voltage: "Voltage",
    price: "Price",
    warranty: "Warranty"
};

const currentPage = ref(1);
const perPage = 5;
const items = ref([]);
const searchQuery = ref("");
const sortColumn = ref(null);
const sortOrder = ref("asc");

watchEffect(() => {
    items.value = getBatteries().value;
});

// Computed: Filtered & Sorted Items
const filteredItems = computed(() => {
    let result = [...items.value];

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(query)
            )
        );
    }

    // Apply sorting
    if (sortColumn.value) {
        result.sort((a, b) => {
            let valueA = a[sortColumn.value];
            let valueB = b[sortColumn.value];

            if (typeof valueA === "string") valueA = valueA.toLowerCase();
            if (typeof valueB === "string") valueB = valueB.toLowerCase();

            return sortOrder.value === "asc"
                ? valueA > valueB ? 1 : -1
                : valueA < valueB ? 1 : -1;
        });
    }

    return result;
});

// Computed: Paginated Items
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredItems.value.slice(start, start + perPage);
});

// Pagination
const totalPages = computed(() => Math.ceil(filteredItems.value.length / perPage));

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const setPage = (page) => { currentPage.value = page; };

// Sorting Function
const sortBy = (column) => {
    if (sortColumn.value === column) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortColumn.value = column;
        sortOrder.value = "asc";
    }
};

// Delete Function with Confirmation
const deleteItem = (id) => {
    const item = items.value.find(battery => battery.id === id);
    if (!item) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete this battery?\n\nBrand: ${item.brand}\nModel: ${item.model}`);

    if (confirmDelete) {
        deleteBattery(id);
        items.value = getBatteries().value;
    }
};
</script>



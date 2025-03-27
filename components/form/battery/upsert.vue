<template>
    <form @submit.prevent="submitForm" class="mt-4">
        <!-- Brand -->
        <div class="mb-3">
            <label class="form-label">Brand</label>
            <select v-model="batteryData.brand" class="form-control" required @change="updateModels">
                <option value="">Select Brand</option>
                <option value="Astra">ASTRA</option>
                <option value="Amaron">AMARON</option>
                <option value="Century">CENTURY</option>
            </select>
        </div>

        <!-- Model -->
        <div class="mb-3">
            <label class="form-label">Model</label>
            <select v-model="batteryData.model" class="form-control" required>
                <option value="">Select Model</option>
                <option v-for="model in availableModels" :key="model" :value="model">
                    {{ model }}
                </option>
            </select>
        </div>

        <!-- Voltage -->
        <div class="mb-3">
            <label class="form-label">Voltage (V)</label>
            <input type="number" class="form-control" v-model.number="batteryData.voltage" required min="1" />
        </div>

        <!-- Price -->
        <div class="mb-3">
            <label class="form-label">Price (RM)</label>
            <input type="number" class="form-control" v-model.number="batteryData.price" required min="1" />
        </div>

        <!-- Warranty -->
        <div class="mb-3">
            <label class="form-label">Warranty (Months)</label>
            <input type="number" class="form-control" v-model.number="batteryData.warranty" required min="1" />
        </div>

        <!-- Buttons -->
        <div class="mt-4">
            <button type="submit" class="btn btn-primary">{{ isEditing ? "Save" : "Create" }}</button>
            <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
        </div>
    </form>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    battery: Object,
    isEditing: Boolean,  // True for edit mode, false for create
    onSave: Function
});

const router = useRouter();
const batteryData = ref({ ...props.battery });

// Battery models based on brand
const modelsByBrand = {
    Astra: ["55D23L", "Gold 75D31R"],
    Amaron: ["46B24R", "55B24L"],
    Century: ["Hybrid NS60L", "Ultra Hi Performance"],
};

// Compute available models based on selected brand
const availableModels = computed(() => modelsByBrand[batteryData.value?.brand] || []);

// Update models when brand changes
const updateModels = () => {
    if (!availableModels.value.includes(batteryData.value.model)) {
        batteryData.value.model = ""; // Reset model if it's not valid for the selected brand
    }
};

// Submit form
const submitForm = () => {
    if (batteryData.value.voltage < 1 || batteryData.value.price < 1 || batteryData.value.warranty < 1) {
        alert("Voltage, Price, and Warranty must be positive numbers.");
        return;
    }

    props.onSave(batteryData.value);
};

const cancel = () => {
    router.back();
};

// Watch for prop updates (for edit mode)
watch(() => props.battery, (newBattery) => {
    batteryData.value = { ...newBattery };
});
</script>

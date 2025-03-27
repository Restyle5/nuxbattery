<template>
    <div>
        <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div class="row w-100">
                <div class="col-md-6 mx-auto">
                    <div class="card">
                        <div class="card-body">

                            <LayoutAppAlert v-if="error" type="danger">{{ error }}</LayoutAppAlert>
                            <LayoutAppAlert type="success" v-if="success">Login successful!</LayoutAppAlert>
                            <h3 class="card-title text-center mb-4">Login</h3>

                            <form @submit.prevent="handleSubmit">
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="username" v-model="username" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" v-model="password"
                                        required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/API/useUser';
import { useBattery } from '@/composables/API/useBattery';
const { login } = useUser();
const { getBatteries } = useBattery();

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)

/**
 * =======================
 *  default username:123
 *  default password:123
 * =======================
 */

// Get the router instance
const router = useRouter()

const handleSubmit = async () => {


    // Mock API call, Calling user Auth.
    const { token, error: loginError } = await login(username.value, password.value);

    if (loginError) {
        error.value = loginError
        success.value = false

    } else {

        // Keep in storage.
        localStorage.setItem('authToken', token)  // Save token in localStorage

        // Call get battery API here.
        const { batteries, error } = await getBatteries();
        if (!error) {

            /**
             * ========================================================================================
             *  IMPORTANT <<<<<<<<<<<<<<<<<<
             * 
             *  There's no DB integration yet. therefore i'll be using storage to play around with data.
             * ========================================================================================
             */
            localStorage.setItem('batteries', JSON.stringify(batteries));
            router.push('/')
        }
    }
}
</script>

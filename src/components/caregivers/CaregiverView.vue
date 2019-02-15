<script>
import { mapActions } from 'vuex';
import FormView from '@/components/generic/form/FormView.mixin';

export default {
    extends: FormView,
    data: () => ({
        caregiverFormShown: false,
        cgLoading: false
    }),
    methods: {
        ...mapActions({
            storeCreateCaregiver: 'createCaregiver',
            storeDeleteCaregiver: 'deleteCaregiver',
        }),
        createCaregiver(data) {
            this.submit(data);
        },
        toggleCaregiverFormShown() {
            this.caregiverFormShown = !this.caregiverFormShown;
        },
        async submitProcedure(data) {
            this.cgLoading = true
            data.id = this.form.id; 
            const caregiver = await this.storeCreateCaregiver(data);

            if (this.model.caregivers)
                this.model.caregivers.push(data);

            this.cgLoading = false
            this.toggleCaregiverFormShown();
        },
        async deleteCaregiver(id) {
            this.cgLoading = true
            await this.storeDeleteCaregiver(id);

            if (this.model.caregivers)
                this.model.caregivers = this.model.caregivers.filter( cg => cg.id !== id );
            this.cgLoading = false
        }
    }
}
</script>

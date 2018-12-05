<script>
import { mapActions } from 'vuex';
import FormView from '@/components/generic/form/FormView.mixin';

export default {
    extends: FormView,
    data: () => ({
        caregiverFormShown: false
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

            data.id = this.form.id; 
            const caregiver = await this.storeCreateCaregiver(data);

            if (this.model.caregivers)
                this.model.caregivers.push(data);

            this.toggleCaregiverFormShown();
        },
        async deleteCaregiver(id) {
            await this.storeDeleteCaregiver(id);

            if (this.model.caregivers)
                this.model.caregivers = this.model.caregivers.filter( cg => cg.id !== id );
        }
    }
}
</script>

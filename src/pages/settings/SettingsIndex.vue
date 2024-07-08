<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">SETTINGS</div>

        <q-tabs
            v-model="tab"
            align="start"
            class="bg-grey-3 text-dark q-mt-md shadow-2"
            active-color="accent"
            indicator-color="accent"
            :breakpoint="0"
        >
            <q-tab name="user-management" icon="group" label="User Management" />
            <q-tab name="course-management" icon="school" label="Course Management" />
            <q-tab name="nature-of-work-management" icon="work" label="Nature of Work Management" />
        </q-tabs>
        <div>
            <q-card square>
                <q-card-section>
                    <div class="text-h5 text-uppercase text-grey-7">{{ tab.replaceAll('-', ' ') }}</div>
                </q-card-section>
                <div v-if="tab === 'user-management'" class="q-px-md">
                    <app-user-index />
                </div>
                <div v-if="tab === 'course-management'" class="q-px-md">
                    <app-course-index />
                </div>
                <div v-if="tab === 'nature-of-work-management'" class="q-px-md">
                    <app-nature-of-work-index />
                </div>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import UserIndex from './user/UserIndex.vue';
import CourseIndex from './course/CourseIndex.vue';
import NatureOfWorkIndex from './nature_of_work/NatureOfWork.vue';

export default {
    data: () => {
        return {
            'tab': 'user-management',
            'name': 'SETTINGS'
        }
    },
    components: {
        appUserIndex: UserIndex,
        appCourseIndex: CourseIndex,
        appNatureOfWorkIndex: NatureOfWorkIndex,
    }
}
</script>
<template>
    <div class="btn-container">

        <n-button type="primary" @click="customs.visible = !customs.visible">
            配置
        </n-button>

    </div>
    <div class="card-container" v-show="customs.visible">
        <n-card content-style="padding: 0;">

            <n-tabs
                v-model:value="customs.focus"
                type="card"
                :addable="addadble"
                tab-style="max-width: 80px;"
                @add="handleAdd"
                @update:value="handleUpdate">

                <n-tab-pane
                v-for="custom in customs.data"
                :key="custom.id"
                :tab="custom.name"
                :name="custom.id">
                    <div class="card-panel">
                        <n-radio
                            :checked="custom.type === 'foot'"
                            :value="'foot'"
                            @change="handleChangeType">
                            徒歩
                        </n-radio>
                        <n-radio
                            :checked="custom.type === 'car'"
                            :value="'car'"
                            @change="handleChangeType">
                            乗用車
                        </n-radio>
                        <n-radio
                            :checked="custom.type === 'bike'"
                            :value="'bike'"
                            @change="handleChangeType">
                            自転車
                        </n-radio>
                        <n-divider />
                        <div class="input-group">
                            <n-radio
                                :checked="custom.model === 'distance'"
                                :value="'distance'"
                                @change="handleChangeModel">
                                距離
                            </n-radio>
                            <n-input v-model:value="custom.distance" type="number" style="max-width: calc(100% - 104px)" @blur="handleInputChange"/>
                        </div>
                        <div class="input-group">
                            <n-radio
                                :checked="custom.model === 'time'"
                                :value="'time'"
                                @change="handleChangeModel">
                                時間
                            </n-radio>
                            <n-input v-model:value="custom.time" type="number" style="max-width: calc(100% - 104px)" @blur="handleInputChange"/>
                        </div>
                    </div>
                </n-tab-pane>

            </n-tabs>

        </n-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed, defineEmits } from 'vue'
import { NButton, NTabs, NTabPane, NCard, NRadio, NDivider, NInput } from 'naive-ui'
import Custom from "./../Model/Custom";
import type { CustomType, CustomModel } from "./../Model/Custom";

onMounted( async () => emit("change", getCustomById(customs.focus)));

let count = 1;

const customs = reactive({

    visible : false,
    focus : 0,
    data : [ new Custom(0, tabName()) ]

})

const addadble = computed( _ => {

    return { disabled: customs.data.length >= 3 };

})

const emit = defineEmits(["change"])

function tabName (): string {

    return `配置${count}`;

}

function handleAdd () {

    customs.data.push( new Custom(count++, tabName()));

}

function handleChangeType ( e: Event ) {

    const focus = customs.focus;
    customs.data[focus].type = (e.target as HTMLInputElement).value as CustomType;
    emit("change", getCustomById(focus));

}

function handleChangeModel ( e: Event ) {

    const focus = customs.focus;
    customs.data[focus].model = (e.target as HTMLInputElement).value as CustomModel;
    emit("change", getCustomById(focus));

}

function handleInputChange () {

    const focus = customs.focus;
    emit("change", getCustomById(focus));

}

function handleUpdate () {

    handleInputChange();

}

function getCustomById ( id: number): Custom | null {

    for ( let i = 0; i < customs.data.length; i++ ) {

        if (customs.data[i].id === id)
            return customs.data[i]

    }

    return null;

}

</script>

<style>

.btn-container {
    position: absolute;
    top: 52px;
    left: 56px;
}

.card-container {
    position: absolute;
    top: 88px;
    left: 56px;
    max-width: 240px;
}

.card-panel {
    width: 240px;
    height: 180px;
}

.input-group {
    margin-top: 12px;
    margin-bottom: 12px;
}

</style>
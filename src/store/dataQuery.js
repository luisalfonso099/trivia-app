import { defineStore } from "pinia";

export const dataQuery = defineStore("query", {
    state: () => ({
        queryData: "bluuweb",
    }),
    getters: {
        getDataQuery(state) {
            return state.queryData;
        },
    },
    actions: {
        setearDataQuery(data) {
            this.queryData = data;
        },
    },
});
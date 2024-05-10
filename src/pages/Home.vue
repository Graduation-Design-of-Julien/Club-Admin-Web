<template>
    <h2>{{ hello }}</h2>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const hello = ref("");

const getHello = () => {
    const date = new Date();
    const helloWorld: {
        hello: string;
        year: string | number;
        month: string | number;
        day: string | number;
        hour: string | number;
        minutes: string | number;
        seconds: string | number;
    } = {
        hello: "",
        year: "",
        month: "",
        day: "",
        hour: "",
        minutes: "",
        seconds: "",
    };
    if (date.getHours() > 6 && date.getHours() < 12) {
        helloWorld.hello = "早上好！";
    } else if (date.getHours() > 12 && date.getHours() < 18) {
        helloWorld.hello = "下午好！";
    } else if (date.getHours() > 18 && date.getHours() <= 23) {
        helloWorld.hello = "晚上好！";
    } else if (date.getHours() > 0 && date.getHours() < 6) {
        helloWorld.hello = "夜深了，请注意休息。";
    }
    helloWorld.year = date.getFullYear();
    date.getMonth() + 1 < 10
        ? (helloWorld.month = "0" + (date.getMonth() + 1))
        : (helloWorld.month = date.getMonth() + 1);
    date.getDate() < 10
        ? (helloWorld.day = "0" + date.getDate())
        : (helloWorld.day = date.getDate());
    date.getHours() < 10
        ? (helloWorld.hour = "0" + date.getHours())
        : (helloWorld.hour = date.getHours());
    date.getMinutes() < 10
        ? (helloWorld.minutes = "0" + date.getMinutes())
        : (helloWorld.minutes = date.getMinutes());
    date.getSeconds() < 10
        ? (helloWorld.seconds = "0" + date.getSeconds())
        : (helloWorld.seconds = date.getSeconds());

    hello.value = `${helloWorld.hello}现在是${helloWorld.year}年${helloWorld.month}月${helloWorld.day}日 ${helloWorld.hour}:${helloWorld.minutes}:${helloWorld.seconds}`;
};

setInterval(getHello, 1000);
</script>

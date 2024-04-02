<template>
    <div class='textCard'>
        <div class="titleCard">
            {{ title }}
        </div>
        <div class="mesCard">
            {{ mes }}
        </div>
        <div class="timeCard">- {{ date }} -</div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        mes: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
.textCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: auto;
    border-radius: 15px;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 10px;
}

.titleCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    height: 25px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 15px;
    font-size: 15px;
    font-weight: 600;
    line-height: 25px;
    color: rgba(250, 116, 138, 0.795);
    box-shadow: inset rgba(0, 0, 0, 0.2) 0px 0px 4px;
}
.mesCard {
    width: 85%;
    height: auto;
    border-radius: 15px;
    background-color: rgba(248, 110, 133, 0.628);
    margin: 15px;
    font-size: 18px;
    /* padding-left: 10px;
    padding-right: 10px; */
    padding: 10px;
    text-indent: 2em;
    box-shadow: inset rgba(0, 0, 0, 0.2) 0px 0px 4px;
}
.timeCard {
    font-size: 15px;
    margin-bottom: 10px;
}
</style>

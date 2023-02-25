<template>
  <q-layout view="lHh Lpr lFf" dir="rtl">
    <q-header elevated class="row justify-between bg-accent q-px-lg q-py-md">
      <div class="logo col-6 col-md-3 row justify-center items-center">
        <!-- <q-icon name="check" /> -->
        <p class="q-ma-none">
          <span class="block t-fs-19"> TOMBS ENGINEER</span>
          <span class="block t-fs-19"> المهندس للمقابر </span>
        </p>
      </div>
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-accent text-white col-6 row justify-between"
      >
        <!-- align="justify" -->
        <q-route-tab
          class="t-fs-24 font-bold"
          name="mainMenu"
          label="الرئيسية"
          :to="{
            path: '/#/',
            hash: '#home',
          }"
        />
        <q-route-tab
          class="t-fs-24 font-bold"
          name="about"
          label="احنا مين"
          :to="{
            path: '/#/',
            hash: '#about',
          }"
        />
        <q-route-tab
          class="t-fs-24 font-bold"
          name="ourServices"
          label="خدماتنا"
          :to="{
            path: '/#/',
            hash: '#services',
          }"
        />
      </q-tabs>
      <!-- <q-tab class="t-fs-24 font-bold" name="testmonials" label="عملائنا" /> -->
      <!-- <q-tab name="contactUs" label="تواصل معنا" /> -->
      <div class="logo col-6 col-md-3 row justify-center">
        <q-btn
          color="white"
          label="تواصل معنا"
          class="text-black"
          :to="{
            path: '/',
            hash: '#card',
          }"
        >
        </q-btn>
      </div>
    </q-header>
    <div class="banner" id="home">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        height="750px"
      >
        <q-carousel-slide :name="1" :img-src="banner1" />
        <q-carousel-slide :name="2" :img-src="banner2" />
        <q-carousel-slide :name="3" :img-src="banner3" />
        <q-carousel-slide :name="4" :img-src="banner4" />
      </q-carousel>
    </div>
    <div class="about-us row q-mt-xl q-pa-xl" id="about">
      <div class="col-12 col-md-6 q-px-xl">
        <h2 class="t-fs-32 q-ma-none q-pa-none q-mb-lg text-primary">
          إحنا مين
        </h2>
        <p class="q-pa-none q-ma-none t-fs-16 line-height-32 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa fugit
          optio perferendis sunt? Aperiam quibusdam unde dolorum eveniet porro
          laboriosam, natus similique odio. Harum quisquam obcaecati a suscipit
          culpa expedita hic est quos amet, voluptates nesciunt, fugit quae
          maxime in, quam facilis mollitia vel itaque nobis numquam possimus
          sapiente cumque! Saepe similique voluptates necessitatibus accusantium
          architecto libero, eligendi a error adipisci exercitationem porro,
          fugit asperiores tempore et voluptatem corporis unde laudantium!
          Illum, modi aut illo cumque eos, incidunt laboriosam, quam quos fuga
          delectus libero impedit nulla alias adipisci. Quisquam ad adipisci
          repudiandae quasi, nihil harum illo! Et, esse ex. Dolores dolorem
          maxime distinctio vitae consequatur animi, fuga eaque ratione facilis
          tempore doloribus voluptate sed reprehenderit accusamus incidunt modi
          deleniti, necessitatibus maiores aperiam sequi eveniet. Iste,
          corporis. Consequatur unde quia eum? Ipsam aperiam ipsa reiciendis,
          ducimus ullam non incidunt porro quasi rem cumque voluptatum, magnam
          ad repudiandae corporis, fugiat id culpa?
        </p>
      </div>
      <div class="col-12 col-md-6">
        <q-img :src="whoWeAre" />
      </div>
    </div>
    <div class="services" id="services">
      <div class="section-title row justify-center">
        <p class="q-ma-none t-fs-32 text-secondary">خدماتنا</p>
      </div>
      <div class="q-pa-xl">
        <div class="row q-col-gutter-lg">
          <div class="col-4">
            <q-card class="my-card" flat bordered>
              <q-img width="450px" height="450px" :src="single" />

              <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">فردى</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn
                  :to="{
                    path: '/',
                    hash: '#card',
                  }"
                  outline
                  color="primary"
                  class="t-fs-16"
                  label="إحجز الأن"
                />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="my-card" flat bordered>
              <q-img width="450px" height="450px" :src="double" />

              <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">ثنائى</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn
                  :to="{
                    path: '/',
                    hash: '#card',
                  }"
                  outline
                  color="primary"
                  class="t-fs-16"
                  label="إحجز الأن"
                />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="my-card" flat bordered>
              <q-img width="450px" height="450px" :src="family" />

              <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">عائلة</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn
                  :to="{
                    path: '/',
                    hash: '#card',
                  }"
                  outline
                  color="primary"
                  class="t-fs-16"
                  label="إحجز الأن"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-use" id="card">
      <div class="section-title row justify-center">
        <p class="q-ma-none t-fs-32 text-secondary">تواصل معنا</p>
      </div>
      <div class="q-pa-xl">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <q-form greedy @submit.prevent="sendEmail">
              <div
                class="from-container gloabl-border q-pa-lg border-radius-10 row"
              >
                <q-input
                  v-model="form.name"
                  type="text"
                  outlined
                  color="primary"
                  label="الأسم"
                  class="col-12 border-radius-10 q-my-md"
                  :rules="rules.requiredRule"
                />
                <q-input
                  v-model="form.phone"
                  type="tel"
                  outlined
                  color="primary"
                  label="رقم المحمول الخاص بك"
                  class="col-12 border-radius-10 q-my-md"
                  :rules="rules.requiredRule"
                />
                <q-input
                  v-model="form.email"
                  type="text"
                  outlined
                  color="primary"
                  label="البريد الالكتروني"
                  class="col-12 border-radius-10 q-my-md"
                  :rules="rules.requiredRule"
                />
                <q-input
                  v-model="form.message"
                  type="textarea"
                  outlined
                  color="primary"
                  label="رسالة توضيحية (اختياري)"
                  class="col-12 border-radius-10 q-my-md"
                />
                <div class="col-12 w-100 row">
                  <q-btn
                    class="q-py-sm col-12 t-fs-16"
                    color="primary"
                    type="submit"
                    label="ارسال رسالة"
                    unelevated
                  />
                </div>
              </div>
            </q-form>
          </div>
          <div class="col-12 col-md-6">
            <div>
              <q-img :src="contactUs" height="400px" fit="contain"></q-img>
            </div>
            <div class="scoial-media">
              <p>ارقامنا و حساباتنا</p>
              <div class="icons row">
                <div class="item col-6 q-py-md">
                  <q-icon
                    size="md"
                    color="primary"
                    name="phone"
                    class="q-px-md"
                  ></q-icon>
                  <span>01021456365</span>
                </div>
                <div class="item col-6 q-py-md">
                  <q-btn
                    class="q-pa-none"
                    flat
                    href="https://api.whatsapp.com/send?phone=1028018440"
                    target="_blank"
                  >
                    <q-icon
                      size="md"
                      color="primary"
                      name="fa-brands fa-whatsapp"
                      class="q-px-md"
                    ></q-icon>
                    <span>01021456365</span>
                  </q-btn>
                </div>
                <div class="item col-6 q-py-md">
                  <q-btn
                    class="q-pa-none"
                    flat
                    href="https://api.whatsapp.com/send?phone=1028018440"
                    target="_blank"
                  >
                    <q-icon
                      size="md"
                      color="primary"
                      name="fa-brands fa-facebook"
                      class="q-px-md"
                    ></q-icon>
                    <span>01021456365</span>
                  </q-btn>
                </div>
                <div class="item col-6 q-py-md">
                  <q-btn
                    class="q-pa-none"
                    flat
                    href="https://api.whatsapp.com/send?phone=1028018440"
                    target="_blank"
                  >
                    <q-icon
                      size="md"
                      color="primary"
                      name="fa-brands fa-instagram"
                      class="q-px-md"
                    ></q-icon>
                    <span>01021456365</span>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import banner1 from "src/assets/banner-new-1-transformed.png";
import banner2 from "src/assets/banner-new-2-transformed.png";
import banner3 from "src/assets/banner-new-3-transformed.png";
import banner4 from "src/assets/banner-new-4-transformed.png";
import whoWeAre from "src/assets/who we are.jpg";
import single from "src/assets/single.png";
import double from "src/assets/couble.jpeg";
import family from "src/assets/family_service-transformed.jpeg";
import contactUs from "src/assets/contact-us.jpg";
import { Email } from "./smtp";
const { t } = useI18n();
const tab = ref("mainMenu");
const slide = ref(1);
const autoplay = ref(true);
const form = ref({
  name: "jdnwkjn",
  phone: "wdwkldmwkl",
  email: "jdkwdnkwjd",
  message: "dkwlmdlkwmlkmdl",
});
const rules = {
  requiredRule: [
    (val) => (val && val.length > 0) || val > 0 || t("من فضلك ادخل البيانات"),
  ],
};
const sendEmail = () => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "kimosody125@gmail.com",
    Password: "CB48E286944B8D574EFA93F5A045A1531B7B",
    To: "omarelsheeta@bk.ru", // الايميل اللى هيتبعت عليه اليانات
    From: "omarelsheeta@bk.ru", // الايميل اللى هيتبعت عليه اليانات
    Subject: "new contact ",
    Body: `
    name : ${form.value.name}
    phone : ${form.value.phone}
    email : ${form.value.email}
    message : ${form.value.message}
    `,
  }).then((res) => {
    console.log(res);
  });
};
</script>

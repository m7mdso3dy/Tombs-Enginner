<template>
  <q-layout view="hHr LpR lfr" dir="rtl">
    <q-header elevated class="row justify-between bg-primary q-px-lg q-py-md">
      <div class="logo col-6 col-md-3 row justify-center items-center">
        <p class="q-ma-none">
          <span class="block t-fs-19"> TOMBS ENGINEER</span>
          <span class="block t-fs-19"> المهندس للمقابر </span>
        </p>
      </div>
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-primary text-white col-6 row justify-between"
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
      <q-btn
        v-if="!authed"
        color="white"
        class="text-black border-radius-6"
        label="تسجيل الدخول"
        @click="loginPopup = true"
      />
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
        <p class="q-pa-none q-ma-none t-fs-32 line-height-50 text-secondary">
          شركة المهندس للمقابر لجميع أنواع المقابر والمدافن والأحواش بجميع أنحاء
          الجمهورية تقدم لعملاء مقابر للبيع ومدافن للبيع وأحواش، وتوفر شراء
          مقابر للعملاء في أسرع وقت وبخبرة كبيرة في مجال بيع المقابر والمدافن
          التشطيبات كما تتميز شركه المهندس بوجود مقابر للعملاء بإمكانيات نقل
          التخصيص باسم العميل مثل المقابر الخاصة بجمعيات الحرس الجمهورى ومقابر
          الأمن الوطنى ومقابر الخاصه بجمعيه رئاسة الجمهورية منذ عام 1980م.
        </p>
      </div>
      <div class="col-12 col-md-6">
        <q-img :src="whoWeAre" />
      </div>
    </div>
    <div class="services row" id="services">
      <div
        class="section-title row w-100 col-12"
        :class="authed ? 'justify-between' : 'justify-center'"
      >
        <div class="col-3 row justify-center">
          <p class="q-ma-none t-fs-32 text-secondary">خدماتنا</p>
        </div>
        <div
          v-if="authed"
          class="edit-services row items-center justify-center col-3"
        >
          <q-btn
            outline
            color="primary"
            label="تعديل الحدمات المعروضة"
            class="border-radius-6"
            @click="editDataPopup = true"
          />
        </div>
      </div>
      <div class="q-pa-xl">
        <div class="row q-col-gutter-lg">
          <div v-for="(tomb, i) in tombsDataAvailable" :key="i" class="col-4">
            <q-card class="my-card" flat bordered>
              <q-img width="450px" height="450px" :src="tomb.images[0]?.src" />

              <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ tomb.title }}</div>
                <div class="text-caption text-grey">
                  {{ tomb.adress }}
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn
                  outline
                  color="primary"
                  class="t-fs-16"
                  label="إحجز الأن"
                  @click="openTombPopup(i)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-use q-mb-xl" id="card">
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
              <p>أرقام التواصل</p>
              <div class="icons row">
                <div class="item col-12 q-py-md">
                  <q-icon
                    size="md"
                    color="primary"
                    name="phone"
                    class="q-px-md"
                  ></q-icon>
                  <span>01002501044</span>
                </div>
                <div class="item col-12 q-py-md">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative-position q-pa-lg bg-primary">
      <q-footer class="row q-mt-xl q-pa-lg">
        <div class="col-12 col-sm-3">
          <div class="logo col-6 col-md-3 row justify-center items-center">
            <p class="q-ma-none">
              <span class="block t-fs-19"> TOMBS ENGINEER</span>
              <span class="block t-fs-19"> المهندس للمقابر </span>
            </p>
          </div>
        </div>
        <div class="col-12 col-sm-6 scoial-media row items-center">
          <div class="col-4"></div>
          <div class="col-3 row">
            <div class="item col-4 q-py-md">
              <q-btn
                class="q-pa-none"
                flat
                href="https://api.whatsapp.com/send?phone=1028018440"
                target="_blank"
              >
                <q-icon
                  size="md"
                  color="white"
                  name="fa-brands fa-whatsapp"
                  class="q-px-md"
                ></q-icon>
              </q-btn>
            </div>
            <div class="item col-4 q-py-md">
              <q-btn
                class="q-pa-none"
                flat
                href="https://web.facebook.com/"
                target="_blank"
              >
                <q-icon
                  size="md"
                  color="white"
                  name="fa-brands fa-facebook"
                  class="q-px-md"
                ></q-icon>
              </q-btn>
            </div>
            <div class="item col-4 q-py-md">
              <q-btn
                class="q-pa-none"
                flat
                href="https://www.instagram.com/"
                target="_blank"
              >
                <q-icon
                  size="md"
                  color="white"
                  name="fa-brands fa-instagram"
                  class="q-px-md"
                ></q-icon>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-3 logo row justify-center items-center">
          <span> . </span>
          Copyrights © 2023 TOMBS ENGINEER
        </div>
      </q-footer>
    </div>
    <dialogComp v-model="tombDetailsPopup" :title="activeTomb.title">
      <div class="tomb-details">
        <p class="adress">
          <q-icon size="sm" name="location_on" color="primary"></q-icon>
          {{ activeTomb.adress }}
        </p>
        <p class="description">
          <q-icon size="sm" name="description" color="primary"></q-icon>
          {{ activeTomb.description }}
        </p>
        <div class="images row q-col-gutter-md">
          <div
            class="col-4 tomb-img"
            v-for="(img, i) in activeTomb.images"
            :key="i"
          >
            <q-img
              class="gloabl-border border-radius-10"
              :src="img"
              width="100%"
              height="100%"
            ></q-img>
          </div>
        </div>
        <br />
        <br />
        <q-form greedy @submit.prevent="sendEmailTomb">
          <div
            class="from-container gloabl-border q-pa-lg border-radius-10 row"
          >
            <q-input
              v-model="activeTombForm.name"
              type="text"
              outlined
              color="primary"
              label="الأسم"
              class="col-12 border-radius-10 q-my-md"
              :rules="rules.requiredRule"
            />
            <q-input
              v-model="activeTombForm.phone"
              type="tel"
              outlined
              color="primary"
              label="رقم المحمول الخاص بك"
              class="col-12 border-radius-10 q-my-md"
              :rules="rules.requiredRule"
            />
            <q-input
              v-model="activeTombForm.email"
              type="text"
              outlined
              color="primary"
              label="البريد الالكتروني"
              class="col-12 border-radius-10 q-my-md"
              :rules="rules.requiredRule"
            />
            <q-input
              v-model="activeTombForm.message"
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
    </dialogComp>
    <dialogComp v-model="editDataPopup" title="تعديل بيانات الخدمات المعروضة">
      <q-expansion-item
        class="company-accordion q-mb-lg gloabl-border q-px-md"
        v-for="(tomb, i) in tombsDataAvailable"
        :key="i"
        default-opened
      >
        <template v-slot:header>
          <q-item-section class="accordion-header">
            <span class="company-title">{{ tomb.title }}</span>
          </q-item-section>
          <q-item-section
            v-if="tombsDataAvailable.length > 1"
            class="accordion-header row justify-end items-end"
          >
            <q-icon
              name="cancel"
              color="negative"
              size="sm"
              @click="removeTomb(i)"
            />
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div class="row company-header">
              <div class="col-md-12 col-xs-12">
                <div class="row q-col-gutter-md q-mb-md">
                  <div class="col-12 col-sm-6 col-md-4">
                    <q-input
                      outlined
                      v-model.trim="tomb.title"
                      type="text"
                      :label="$t('اسم الحدمة')"
                      :rules="[...rules.requiredRule]"
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-4">
                    <q-input
                      outlined
                      v-model="tomb.adress"
                      type="text"
                      :label="$t('عنوان المقبرة')"
                      :rules="[...rules.requiredRule]"
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-4">
                    <q-input
                      outlined
                      v-model="tomb.description"
                      type="email"
                      :label="$t('وصف المقبرة')"
                      :rules="[...rules.requiredRule]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 row justify-between q-col-gutter-sm">
              <div class="col-12 col-md-6">
                <uploader
                  :label="$t('صور المكان')"
                  accept="image/jpeg,image/png"
                  v-model="tomb.images"
                  :multiple="true"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-btn
        flat
        color="primary"
        icon="add"
        label="اضافة مقبرة جديدة"
        @click="addNewTomb"
      />
    </dialogComp>
    <dialogComp v-model="loginPopup" title="تسجيل الدخول">
      <q-form @submit.prevent="submitlogin">
        <div class="gloabl-border q-pa-xl">
          <q-input
            outlined
            v-model.trim="loginForm.user"
            type="text"
            :label="$t('اسم المستخدم')"
            :rules="[...rules.requiredRule]"
          />
          <q-input
            outlined
            v-model.trim="loginForm.password"
            type="password"
            :label="$t('كلمة  المرور')"
            :rules="[...rules.requiredRule]"
          />
          <q-btn color="primary" label="تسجيل الدخول" type="submit" />
        </div>
      </q-form>
    </dialogComp>
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
import { useQuasar } from "quasar";
import dialogComp from "src/components/dialog-cb.vue";
import uploader from "src/components/uploader-input.vue";
const $q = useQuasar();
const { t } = useI18n();
const tab = ref("mainMenu");
const slide = ref(1);
const autoplay = ref(true);
const form = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});
const activeTombForm = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});
const rules = {
  requiredRule: [
    (val) => (val && val.length > 0) || val > 0 || t("من فضلك ادخل البيانات"),
  ],
};
const tombDetailsPopup = ref(false);
const editDataPopup = ref(false);
const loginPopup = ref(false);
const tombsDataAvailable = ref([
  {
    title: "مقبرة 1",
    adress: "شارع احمد بركات بقناة السويس",
    description: `توجد المقيرة فى شارع احمد حسان البرهيمى بسكان المنزلة
      مساحة 500  متر مربع
      اسعار منافسة جدا
      `,
    images: [],
  },
  {
    title: "مقبرة 2",
    adress: "شارع احمد بركات بقناة السويس",
    description: `توجد المقيرة فى شارع احمد حسان البرهيمى بسكان المنزلة
      مساحة 500  متر مربع
      اسعار منافسة جدا
      `,
    images: [],
  },
  {
    title: "مقبرة 3",
    adress: "شارع احمد بركات بقناة السويس",
    description: `توجد المقيرة فى شارع احمد حسان البرهيمى بسكان المنزلة
      مساحة 500  متر مربع
      اسعار منافسة جدا
      `,
    images: [],
  },
]);
const activeTomb = ref(tombsDataAvailable.value[0]);
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
    if (String(res).toLowerCase() == "ok") {
      $q.notify({});
    }
  });
};
const sendEmailTomb = () => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "kimosody125@gmail.com",
    Password: "CB48E286944B8D574EFA93F5A045A1531B7B",
    To: "omarelsheeta@bk.ru", // الايميل اللى هيتبعت عليه اليانات
    From: "omarelsheeta@bk.ru", // الايميل اللى هيتبعت عليه اليانات
    Subject: "new contact ",
    Body: `
    name : ${activeTombForm.value.name}
    phone : ${activeTombForm.value.phone}
    email : ${activeTombForm.value.email}
    message : ${activeTombForm.value.message}
    `,
  }).then((res) => {
    if (String(res).toLowerCase() == "ok") {
      $q.notify({});
    }
  });
};
const openTombPopup = (index) => {
  tombDetailsPopup.value = true;
  activeTomb.value = tombsDataAvailable.value[index];
};
const removeTomb = () => {};
const addNewTomb = () => {
  tombsDataAvailable.value.push({
    title: "",
    adress: "",
    description: ``,
    images: [],
  });
};
const authed = ref(false);
const loginForm = ref({
  user: "",
  password: "",
});
const submitlogin = () => {
  if (
    loginForm.value.user == "admin" &&
    loginForm.value.password == "Tomb_Admin_123"
  ) {
    authed.value = true;
    loginPopup.value = false;
  } else {
    console.log("test");
  }
};
</script>

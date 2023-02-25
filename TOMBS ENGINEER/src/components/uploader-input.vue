<template>
  <div class="input-uploder-container column">
    <div class="input-uploder" v-if="!(downloadOnly && multiple)">
      <q-uploader
        ref="uploader"
        square
        flat
        bordered
        :max-file-size="maxFileSize"
        :accept="accept"
        @added="assignFiles($event, multiple)"
        @rejected="notifyReject"
        :multiple="multiple"
        v-show="false"
        :downloadOnly="downloadOnly"
      />
      <q-input
        v-if="required"
        class="invisible absolute"
        ref="formField"
        v-model="updatedValue"
        :rules="[...rules.requiredRule, ...customRules]"
      />
      <q-input
        v-else
        class="invisible absolute"
        ref="formField"
        v-model="updatedValue"
        :rules="customRules"
      />
      <div
        class="` uploader border-gray relative-position dashed-border row items-center q-pa-md `"
        :class="`${showError && 'text-red'} ${uploaderContainerClass}`"
      >
        <div class="column w-100">
          <div v-if="!multiple && !files" class="q-px-sm upper row">
            <div class="uploader-img q-mr-sm">
              <q-avatar size="20px" square>
                <img src="~src/assets/icons/uploder-img-grey.svg" />
              </q-avatar>
            </div>
            <div
              :class="required && 'required-input'"
              class="row justify-center items-center"
            >
              <p
                class="q-pa-none q-ma-none q-field__label t-fs-12 font-regular"
              >
                {{ label }}
              </p>
            </div>
          </div>
          <div v-else-if="multiple && !files" class="q-px-sm upper row">
            <div class="uploader-img q-mr-sm">
              <q-avatar size="20px" square>
                <img src="~src/assets/icons/uploder-img-grey.svg" />
              </q-avatar>
            </div>
            <div
              :class="required && 'required-input'"
              class="row justify-center items-center"
            >
              <p
                class="q-pa-none q-ma-none q-field__label t-fs-12 font-regular"
              >
                {{ label }}
              </p>
            </div>
          </div>
          <div v-else-if="multiple && files" class="q-px-sm upper row">
            <div v-if="!downloadOnly" class="uploader-img q-mr-sm">
              <q-avatar size="20px" square>
                <img src="~src/assets/icons/uploder-img-grey.svg" />
              </q-avatar>
            </div>
            <div
              :class="required && 'required-input'"
              class="row justify-center items-center"
            >
              <p
                class="q-pa-none q-ma-none q-field__label t-fs-12 font-regular"
              >
                {{ label }}
              </p>
            </div>
          </div>
          <div
            class="q-px-sm upper row justify-between items-center"
            v-else-if="!multiple && files"
          >
            <div
              class="q-field__label t-fs-12 font-regular q-ma-none col-8 overflow-hidden"
            >
              <n-text-trimmer :text="files.fileName" :maxLength="30" />
            </div>
            <div class="icons row h-100">
              <!-- Old condition changed to preview the image in all cases  -->
              <!-- v-if="files.type.includes('image') && !downloadOnly" -->
              <q-avatar
                v-if="files.type.includes('image')"
                @click="openPopup(0)"
                size="22px"
                circle
                class="bg-blue-1 q-mr-sm cursor-pointer"
              >
                <q-img
                  src="~src/assets/icons/preview.svg"
                  width="12px"
                  height="12px"
                  fit="contain"
                />
              </q-avatar>
              <q-badge
                v-else
                @click="formatter.downloadFile(files)"
                size="22px"
                rounded
                class="bg-blue-1 q-mr-sm cursor-pointer"
                :style="!downloadOnly && 'padding: 2px'"
              >
                <q-icon name="file_download" size="xs" color="grey" />
                <span v-if="downloadOnly" class="text-grey">{{
                  $t("download")
                }}</span>
              </q-badge>
              <q-avatar
                v-if="!downloadOnly"
                @click="removeFiles(0, true)"
                size="22px"
                circle
                class="bg-blue-1 cursor-pointer"
              >
                <q-img
                  src="~src/assets/icons/remove.svg"
                  width="12px"
                  height="12px"
                  fit="contain"
                />
              </q-avatar>
            </div>
          </div>
        </div>
        <label
          v-if="!multiple && !files"
          @click="grapFile"
          class="over-lay"
        ></label>
        <label
          v-else-if="multiple && !files"
          @click="grapFile"
          class="over-lay"
        ></label>
        <label
          v-else-if="multiple && files"
          @click="grapFile"
          class="over-lay"
        ></label>
      </div>
    </div>
    <div
      v-if="multiple && files"
      class="multiple-files column text-grey-4 q-pt-sm"
    >
      <div v-for="(file, index) in files" :key="index" class="file row q-pb-xs">
        <div class="fileName q-mr-sm col">
          <p
            class="q-ma-none h-100 row items-center q-px-lg t-fs-11 text-black"
          >
            {{ file.fileName }}
          </p>
        </div>
        <div class="icons text-red row col-auto">
          <!-- Old condition changed to preview the image in all cases  -->
          <!-- v-if="files.type.includes('image') && !downloadOnly" -->
          <q-avatar
            v-if="file.type.includes('image')"
            @click="openPopup(index, true)"
            size="22px"
            circle
            class="bg-blue-1 q-mr-sm cursor-pointer"
          >
            <q-img
              src="~src/assets/icons/preview.svg"
              width="12px"
              height="12px"
              fit="contain"
            />
          </q-avatar>
          <q-badge
            v-else
            @click="formatter.downloadFile(file)"
            size="22px"
            rounded
            class="bg-blue-1 q-mr-sm cursor-pointer"
            :style="!downloadOnly && 'padding: 2px'"
          >
            <q-icon name="file_download" size="xs" color="grey" />
            <span v-if="downloadOnly" class="text-grey">{{
              $t("download")
            }}</span>
          </q-badge>
          <q-avatar
            v-if="!downloadOnly"
            @click="removeFiles(index)"
            size="22px"
            circle
            class="bg-blue-1 cursor-pointer"
          >
            <q-img
              src="~src/assets/icons/remove.svg"
              width="12px"
              height="12px"
              fit="contain"
            />
          </q-avatar>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="preview">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="bg-white">
        <img :src="previewSrc" />
        <q-card-section>
          <div class="text-h6">{{ label }}</div>
          <div class="text-subtitle2">{{ previewTitle }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { uploaderTypesEnums } from "src/configs/Enums";
import formatter from "src/configs/formatter";
import { i18n } from "src/boot/i18n";
import rules from "src/configs/rules";
export default {
  props: {
    label: {
      type: String,
      default: i18n.t("superAdmin.add"),
    },
    accept: {
      type: String,
      default: "image/jpeg,image/png,application/pdf,image/jpg",
    },
    max: {
      type: Number,
      default: 5,
    },
    required: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    modelValue: {},
    uploadingType: {
      type: Number,
      default: uploaderTypesEnums.base64,
    },
    webService: {
      type: Function,
      default: () => {},
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: i18n.t("signUp.required"),
    },
    downloadOnly: {
      type: Boolean,
      default: false,
    },
    customRules: {
      type: Array,
      default: () => [],
    },
    uploaderContainerClass: {
      type: String,
    },
  },
  setup(props, { emit }) {
    console.log(props);
    const { t } = useI18n();
    const $q = useQuasar();
    const types = ref("");
    const uploader = ref();
    const files = ref();
    const showError = ref(props.isError);
    const updatedValue = ref();
    const preview = ref(false);
    const previewSrc = ref("");
    const previewTitle = ref("");
    const maxFileSize = computed(() => props.max * 1048576);
    const accptedFiles = props.accept.split(",");
    const formField = ref();
    /* why having the files ====> the removeFile method of quasar takes the file instace not the id so you need to have the instace of every available file and the should also be at same orgnize so you can control how to access them*/
    const filesInstances = ref([]);
    ///convert the types sent through props to types string
    types.value = accptedFiles
      .map((el) => {
        const item = el.split("/");
        if (item[1] == "*") {
          return item[0].toUpperCase();
        } else {
          if (
            item[1] ==
            "vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            return "DOCS";
          } else if (
            item[1] == "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            return "XLSX";
          }
          return item[1].toUpperCase();
        }
      })
      .join("/");
    //memic uploader click to open file system to chose files
    const grapFile = () => {
      if (props.downloadOnly) {
        return;
      }
      uploader.value.pickFiles();
    };
    //---> convert file to base64 or multipart
    const convertFile = (file) => {
      filesInstances.value.push(file);
      if (props.uploadingType === uploaderTypesEnums.base64) {
        return new Promise((reslove) => {
          const reader = new FileReader();
          reader.onloadend = function () {
            const unitFile = {
              base64: formatter.extractStringFromBase64(reader.result),
              fileName: file.name,
            };
            const fileFormat = formatter.handleAndGetFileData(unitFile);
            reslove(fileFormat);
          };
          reader.readAsDataURL(file);
        });
      } else if (props.uploadingType === uploaderTypesEnums.multipart) {
        const convertToBase64 = new Promise((reslove) => {
          const reader = new FileReader();
          reader.onloadend = function () {
            const unitFile = {
              base64: formatter.extractStringFromBase64(reader.result),
              fileName: file.name,
            };
            const fileFormat = formatter.handleAndGetFileData(unitFile);
            reslove(fileFormat);
          };
          reader.readAsDataURL(file);
        });
        const convertToMultiPart = new Promise((reslove, reject) => {
          let formData = new FormData();
          formData.append("image", file);
          props
            .webService(formData)
            .then((res) => {
              reslove(res.data[0]);
            })
            .catch((err) => {
              reject(err);
            });
        });
        return Promise.all([convertToBase64, convertToMultiPart])
          .then((values) => {
            return {
              ...values[0],
              ...values[1],
            };
          })
          .catch((err) => {
            throw err;
          });
      }
    };
    //handle updating reactivity of the files
    const getconvertedFiles = (file, multi) => {
      convertFile(file)
        .then((res) => {
          if (!multi) {
            updatedValue.value = res;
          } else {
            if (!formatter.isArray(updatedValue.value)) {
              updatedValue.value = [];
            }
            const computeUpdatedValue = [...updatedValue.value, res];
            updatedValue.value = computeUpdatedValue;
          }
          emit("update:modelValue", updatedValue.value);
          showError.value = false;
        })
        .catch((err) => {});
    };
    ///grap file from the uploader
    const assignFiles = (file, multi) => {
      file.forEach((file) => {
        getconvertedFiles(file, multi);
      });
    };
    ///note the fileuploader in case you want delete a specfic file
    //need the file instance itself not only the id
    const removeFiles = (index, main = false) => {
      if (main) {
        uploader.value.removeQueuedFiles();
        updatedValue.value = null;
        emit("update:modelValue", updatedValue.value);
        if (props.required) {
          showError.value = true;
        }
      } else {
        uploader.value.removeFile(filesInstances.value[index]);
        filesInstances.value = filesInstances.value.filter(
          (file, i) => i != index
        );
        updatedValue.value = updatedValue.value.filter((file, i) => i != index);
        emit("update:modelValue", updatedValue.value);
        if (props.required) {
          if (props.multiple && updatedValue.value.length === 0) {
            showError.value = true;
          } else if (!props.multiple && !updatedValue.value) {
            showError.value = false;
          }
        }
      }
    };
    //popup of image preview handler
    const openPopup = (id, multi) => {
      if (multi) {
        preview.value = true;
        previewSrc.value = files.value[id].src;
        previewTitle.value = files.value[id].fileName;
      } else {
        preview.value = true;
        previewSrc.value = files.value.src;
        previewTitle.value = files.value.fileName;
      }
    };
    /// watchers
    //watch if you want to control the error state from outside
    watch(
      () => props.isError,
      () => {
        showError.value = props.isError;
      }
    );
    /// here you could get confused a little cause you
    //have two vaiable that seems to have the same values
    //well you aren't totaly wrong but here is why
    //in the first of creating this component the files were the files instaces that you preview the uploader with
    //but later in using it we saw that you need to make the uploader can edit and update on data that doesn't have the files instaces
    //so the best way was that you need to make preview work on only one approach which is the base64 approch cause you can always have access to it
    //and there was already a big part of functionality already created based on the behavior of the files variable
    //so here we memic the updated value into the files variable but with the tweeks we need it to make the functionlity work as perfect as possible
    watch(updatedValue, (newVal) => {
      if (props.multiple) {
        if (!newVal.length) {
          files.value = null;
        } else {
          files.value = newVal;
        }
      } else {
        files.value = newVal;
      }
    });
    //watch fake input error to simulate the form input behavior
    const hasError = computed(() => {
      return formField.value?.hasError;
    });
    watch(hasError, (newVal) => {
      showError.value = newVal;
    });
    ////work in progress
    watch(
      () => props.modelValue,
      (newVal) => {
        if (
          (newVal && (newVal?.base64 || newVal?.fileName)) ||
          (newVal && newVal.length)
        ) {
          if (props.multiple) {
            if (!formatter.isArray(newVal)) {
              newVal = [newVal];
            }
            updatedValue.value = newVal.map((file) =>
              formatter.handleAndGetFileData(file)
            );
            if (!filesInstances.value.length) {
              filesInstances.value = [...updatedValue.value];
            }
          } else {
            updatedValue.value = formatter.handleAndGetFileData(newVal);
          }
        }
      }
    );
    //end of watchers

    ///reason of rejection
    const notifyReject = (fileList) => {
      fileList.forEach((file) => {
        if (file.failedPropValidation == "duplicate") {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: `${file.file.name} ${t("uploader.duplicatedFile")}`,
          });
        }
        if (file.failedPropValidation == "accept") {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: `${t("uploader.fileType")} ${file.file.name} ${t(
              "uploader.NotAccepted"
            )}`,
          });
        }
        if (file.failedPropValidation == "max-file-size") {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: `${t("uploader.fileSize")} ${file.file.name} ${t(
              "uploader.biggerThan"
            )}${props.max} ${t("mega")}`,
          });
        }
      });
    };
    onMounted(() => {
      if (props.modelValue) {
        if (
          (props.modelValue &&
            (props.modelValue?.base64 || props.modelValue?.fileName)) ||
          (props.modelValue && props.modelValue.length)
        ) {
          if (props.multiple) {
            let arr = null;
            if (!formatter.isArray(props.modelValue)) {
              arr = [props.modelValue];
            } else {
              arr = [...props.modelValue];
            }
            updatedValue.value = arr.map((file) =>
              formatter.handleAndGetFileData(file)
            );
            if (!filesInstances.value.length) {
              filesInstances.value = [...updatedValue.value];
            }
          } else {
            updatedValue.value = formatter.handleAndGetFileData(
              props.modelValue
            );
          }
        }
      }
    });
    return {
      types,
      grapFile,
      uploader,
      maxFileSize,
      files,
      assignFiles,
      removeFiles,
      updatedValue,
      showError,
      openPopup,
      preview,
      previewSrc,
      previewTitle,
      notifyReject,
      formatter,
      rules,
      formField,
      filesInstances,
    };
  },
};
</script>

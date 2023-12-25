<script lang="ts" setup name="UploadButton">
import { ElMessage } from 'element-plus';
import type { UploadRawFile, UploadRequestOptions } from 'element-plus/es/components/upload/src/upload';
import { getImageSize, upload } from "@/service";
import useComponentData from "../stores/index";
import useSnapshot from "../stores/snapShot";
import { generateID } from '@/utils/util';

const store = useComponentData();
const snapshotStore = useSnapshot();

const props = defineProps({
    maxSize: {
        required: true,
        type: Number,
    },
});

let ImageWidth = 0;
let ImageHeight = 0;
let uploading = false;

const handleUpload = (options: UploadRequestOptions) => {
  const file = options.file;
  if (!file || uploading) {
    return;
  }
  const formData = new FormData();
  formData.append('file', file as File);
  uploading = true;
  upload({ formData, width: ImageWidth, height: ImageHeight })
      .then((resp) => {
        console.log(resp, 'resp----');
        const url = resp.data.uri;
        const md5 = resp.data.md5;
        console.log(url, md5, 'uploadsuccess');
        const component = {
            id: generateID(),
            component: 'Picture',
            label: '图片',
            icon: '',
            animations: [],
            events: {},
            propValue: {
              url,
            },
            style: {
                top: 0,
                left: 0,
                width: ImageWidth,
                height: ImageHeight,
            }
        };
        store.addComponent(component);
        console.log(store.componentData, 'componentData----');
        snapshotStore.recordSnapshot();
      })
      .finally(() => {
        uploading = false;
      });
}

const handleBefore = async (rawFile: UploadRawFile) => {
    console.log('[debug]: file', rawFile);
    const isLtMaxSize = rawFile.size / 1024 / 1024 < props.maxSize;
    if (!isLtMaxSize) {
        ElMessage({
            message: `图片大小不得超过${props.maxSize}M`,
            type: 'error',
        })
        return;
    }
    const imageSize = await getImageSize(rawFile);
    ImageWidth = imageSize.width;
    ImageHeight = imageSize.height;
    console.log(imageSize, 'width,  height----');
    return true;
}
</script>

<template>
  <el-upload
    action="#"
    accept="image/png, image/jpeg, image/webp"
    :before-upload="handleBefore"
    :http-request="handleUpload"
  >
    <el-button type="primary">上传图片</el-button>
  </el-upload>
</template>

<style lang="scss" scoped></style>

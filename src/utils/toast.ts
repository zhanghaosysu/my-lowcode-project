import { ElMessage } from "element-plus";

export default function toast(
  message = "",
  type: "error" | "success" | "warning" | "info" = "error",
  duration = 1500
) {
  ElMessage({
    message,
    type,
    duration,
  });
}

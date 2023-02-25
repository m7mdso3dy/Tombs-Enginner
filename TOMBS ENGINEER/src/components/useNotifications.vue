<script>
import { useQuasar } from "quasar";

const statusList = {
  success: "green-4",
  error: "red-5",
  warning: "warning",
};

const icons = {
  warning: "warning",
  error: "error",
  success: "cloud_done",
};

export default function useUserRepositories() {
  const $q = useQuasar();

  const notify = (status, message, configs) => {
    $q.notify({
      color: statusList[status],
      textColor: "white",
      message: message,
      icon: icons[status],
      timeout: 700,
      ...configs,
    });
  };

  return {
    notify,
  };
}
</script>

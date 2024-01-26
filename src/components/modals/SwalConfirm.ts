import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SwalConfirm = async (title: string, icon: SweetAlertIcon) => {
  const result = await MySwal.fire({
    title,
    icon,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#1F64BC",
  });

  return result.isConfirmed;
};

export default SwalConfirm;

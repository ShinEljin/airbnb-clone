import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import Button from "./Button";
import Input from "./inputs/Input";
import { useRouter } from "next/navigation";

interface AccountItemProps {
  userId: string;
  id: string;
  title: string;
  value: string | null;
  editable?: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({
  userId,
  id,
  title,
  value,
  editable,
}) => {
  const router = useRouter();
  const [itemOpen, setItemOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleOpen = useCallback(() => {
    setItemOpen((state) => !state);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.accName === value || data.accPassword === value) {
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/account",
        data.accName
          ? {
              name: data.accName,
              id: userId,
            }
          : {
              password: data.accPassword,
              id: userId,
            }
      );
      setIsLoading(false);
      toast.success("Successfully saved", {
        duration: 5000,
      });
      setItemOpen(false);
      router.refresh();
    } catch (error: any) {
      console.log(error.response);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-3">
        <div className="flex flex-col">
          <p className="font-medium">{title}</p>
          {itemOpen ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id={id}
                label={title}
                required
                title={title}
                value={id === "accPassword" ? "" : value}
                register={register}
                errors={errors}
                disabled={isLoading}
                type={id === "accPassword" ? "password" : "text"}
              />

              <Button label="Save" outline small disabled={isLoading} />
            </form>
          ) : (
            <p className="text-neutral-600 font-light">{value}</p>
          )}
        </div>
        {editable && (
          <div
            className="underline font-semibold cursor-pointer"
            onClick={handleOpen}
          >
            Edit
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default AccountItem;

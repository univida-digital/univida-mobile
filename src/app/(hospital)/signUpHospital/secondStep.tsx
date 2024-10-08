import Button from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import PaperInput from "@/src/components/atoms/paperInput";
import CustomText from "@/src/components/atoms/text";
import Steps from "@/src/components/molecules/steps";
import { IHospital } from "@/src/interfaces/hospital.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from "react-native";

const signUpPasswordHospital = () => {
  const {
    values,
    touched,
    errors,
    handleChange,
    validateForm,
    setTouched,
    setErrors,
  } = useFormikContext<IHospital>();
  const router = useRouter();

  const isFieldValid = (fieldPath: string): boolean => {
    const [arrayName, indexStr, fieldName] = fieldPath
      .split(/[\[\].]+/)
      .filter(Boolean);
    const index = parseInt(indexStr, 10);

    if (arrayName && fieldName && !isNaN(index)) {
      return (
        (values[arrayName as keyof IHospital] as any)?.[index]?.[fieldName] &&
        !(errors[arrayName as keyof IHospital] as any)?.[index]?.[fieldName]
      );
    }

    const [parent, child] = fieldPath.split(".") as [
      keyof IHospital,
      keyof IHospital["user"],
    ];
    if (child) {
      return (
        (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child]
      );
    }

    return false;
  };

  const isCurrentStepValid = (): boolean => {
    const requiredFields = ["user.password", "user.confirmPassword"];

    return requiredFields.every(isFieldValid);
  };

  const handleNavigate = () => {
    validateForm().then((errors) => {
      if (isCurrentStepValid()) {
        router.navigate("signUpHospital/thirdStep");
      } else {
        setTouched({
          user: {
            password: true,
            confirmPassword: true,
          },
        });
        setErrors(errors);
      }
    });
  };

  return (
    <KeyboardAvoidingView enabled={true}>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={2} totalSteps={4} />
        <PaperInput
          label="Senha *"
          placeholder="Crie uma senha"
          value={values.user?.password || ""}
          onChange={handleChange("user.password")}
          hasError={!!errors.user?.password && touched.user?.password}
          mt={20}
          secure
        />
        {touched.user?.password && errors.user?.password ? (
          <CustomText size={10} color="primary">
            {errors.user.password}
          </CustomText>
        ) : null}
        <PaperInput
          label="Confirme a sua senha *"
          placeholder="Confirme a sua senha"
          value={values.user?.confirmPassword || ""}
          onChange={handleChange("user.confirmPassword")}
          hasError={
            !!errors.user?.confirmPassword && touched.user?.confirmPassword
          }
          mt={20}
          secure
        />
        {touched.user?.confirmPassword && errors.user?.confirmPassword ? (
          <CustomText size={10} color="primary">
            {errors.user.confirmPassword}
          </CustomText>
        ) : null}

        <Button title="Prosseguir" onPress={handleNavigate} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpPasswordHospital;

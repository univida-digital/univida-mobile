import React from "react";
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from "react-native";
import PaperInput from "@/src/components/atoms/paperInput";
import Steps from "@/src/components/molecules/steps";
import SelectInput from "@/src/components/molecules/selectInput";
import stateList from "@/src/utils/stateList";

const signUpAddressDonator = () => {
  const {
    values,
    touched,
    errors,
    handleChange,
    validateForm,
    setErrors,
    setTouched,
  } = useFormikContext<IDonator>();
  const router = useRouter();

  const errorsAny = errors as any;

  const isFieldValid = (fieldPath: string): boolean => {
    const [arrayName, indexStr, fieldName] = fieldPath
      .split(/[\[\].]+/)
      .filter(Boolean);
    const index = parseInt(indexStr, 10);

    if (arrayName && fieldName && !isNaN(index)) {
      return (
        (values[arrayName as keyof IDonator] as any)?.[index]?.[fieldName] &&
        !(errors[arrayName as keyof IDonator] as any)?.[index]?.[fieldName]
      );
    }

    const [parent, child] = fieldPath.split(".") as [
      keyof IDonator,
      keyof IDonator["user"],
    ];
    if (child) {
      return (
        (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child]
      );
    }

    return false;
  };

  const isCurrentStepValid = (): boolean => {
    const requiredFields = [
      "addresses[0].state",
      "addresses[0].city",
      "addresses[0].neighborhood",
      "addresses[0].street",
      "addresses[0].zip",
    ];

    return requiredFields.every(isFieldValid);
  };

  const handleNavigate = () => {
    validateForm().then((errors) => {
      if (isCurrentStepValid()) {
        router.navigate("signUpDonator/fourthStep");
      } else {
        setTouched({
          addresses: [
            {
              state: true,
              city: true,
              neighborhood: true,
              street: true,
              zip: true,
            },
          ],
        });
        setErrors(errors);
      }
    });
  };

  return (
    <KeyboardAvoidingView enabled={true}>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={3} totalSteps={6} />
        <SelectInput
          handleChange={handleChange("addresses[0].state")}
          label="Estado *"
          options={stateList}
          placeholder="Selecione o estado"
          value={values.addresses?.[0]?.state ?? ""}
        />
        {touched.addresses?.[0]?.state && errorsAny.addresses?.[0]?.state ? (
          <CustomText size={10} color="primary">
            {(errorsAny.addresses[0] as any).state}
          </CustomText>
        ) : null}

        <PaperInput
          label="Cidade *"
          placeholder="São Paulo"
          value={values.addresses?.[0]?.city ?? ""}
          onChange={handleChange("addresses[0].city")}
          mt={5}
        />
        {touched.addresses?.[0]?.city && errorsAny.addresses?.[0]?.city ? (
          <CustomText size={10} color="primary">
            {(errorsAny.addresses[0] as any).city}
          </CustomText>
        ) : null}

        <PaperInput
          label="Bairro *"
          placeholder="Digite o bairro"
          value={values.addresses?.[0]?.neighborhood ?? ""}
          onChange={handleChange("addresses[0].neighborhood")}
          mt={5}
        />
        {touched.addresses?.[0]?.neighborhood &&
        errorsAny.addresses?.[0]?.neighborhood ? (
          <CustomText size={10} color="primary">
            {(errorsAny.addresses[0] as any).neighborhood}
          </CustomText>
        ) : null}

        <PaperInput
          label="Endereço *"
          placeholder="Digite o endereço"
          value={values.addresses?.[0]?.street ?? ""}
          onChange={handleChange("addresses[0].street")}
          mt={5}
        />
        {touched.addresses?.[0]?.street && errorsAny.addresses?.[0]?.street ? (
          <CustomText size={10} color="primary">
            {(errorsAny.addresses[0] as any).street}
          </CustomText>
        ) : null}

        <PaperInput
          label="CEP *"
          keyboardType="numeric"
          placeholder="12345-678"
          value={values.addresses?.[0]?.zip ?? ""}
          onChange={handleChange("addresses[0].zip")}
          mt={5}
          mask="cep"
          maxLenght={9}
        />
        {touched.addresses?.[0]?.zip && errorsAny.addresses?.[0]?.zip ? (
          <CustomText size={10} color="primary">
            {(errorsAny.addresses[0] as any).zip}
          </CustomText>
        ) : null}

        <Button title="Prosseguir" onPress={handleNavigate} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpAddressDonator;

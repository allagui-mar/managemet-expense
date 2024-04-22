import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import InputDateTimePicker from "../UI/InputDateTimePicker";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const getFormattedDate = (selectedDate) => {
  if (selectedDate instanceof Date) {
    return selectedDate.toISOString().split("T")[0];
  }
  return "";
};

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount?.toString() ?? "",
      isValid: true,
    },
    date: {
      value: getFormattedDate(defaultValues?.date) ?? "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
  });

  const handleDateChange = (selectedDate) => {
    setInputs((curInputs) => ({
      ...curInputs,
      date: { value: getFormattedDate(selectedDate), isValid: true },
    }));
  };

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      let isValid = true;
      if (inputIdentifier === "amount") {
        isValid = !isNaN(+enteredValue) && +enteredValue > 0;
      } else if (inputIdentifier === "date") {
        isValid = enteredValue.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
      } else if (inputIdentifier === "description") {
        isValid = enteredValue.trim().length > 0;
      }
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !dateIsValid) {
      // return Alert.alert("Invalid input-please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={Styles.form}>
      <Text style={Styles.title}>Your Expense</Text>
      <View style={Styles.inputRow}>
        <Input
          style={Styles.rowInput}
          label="amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboard: "decimal-pad",
            onChangeText: (text) => inputChangeHandler("amount", text),
            value: inputs.amount.value,
          }}
        />
        <View style={Styles.inputDate}>
          <Input
            label="Date"
            invalid={!inputs.date.isValid}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: (text) => inputChangeHandler("date", text),
              value: inputs.date.value,
            }}
          />
          <InputDateTimePicker onDateChange={handleDateChange} />
        </View>
      </View>
      <Input
        label="description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => inputChangeHandler("description", text),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={Styles.textInvalid}>
          Invalid inputs {"\n"}Please check your Inputs
        </Text>
      )}
      <View style={Styles.buttons}>
        <Button style={Styles.button} mode="flat" onPress={onCancel}>
          cancel
        </Button>
        <Button style={Styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const Styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputDate: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  textInvalid: {
    fontSize: 20,
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

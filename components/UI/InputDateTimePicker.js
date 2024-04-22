import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconButton from "./IconButton";
import { GlobalStyles } from "../../constants/styles";

const InputDateTimePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <IconButton
        onPress={showPicker}
        icon="calendar"
        size={42}
        color={GlobalStyles.colors.primary400}
      />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 18,
  },
});

export default InputDateTimePicker;

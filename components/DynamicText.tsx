import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

const DynamicText = (props) => {
  const [value, setValue] = useState("Random Text");
  const {childFunc} = props;

  React.useEffect(() => {
    childFunc.current = changeValue
  }, [])

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return  <FormLabel noOfLines={[1, 2, 3]}>{value}</FormLabel>;
};

export default DynamicText;

import Head from "next/head";
import React, { useRef, createRef  } from 'react';
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";
import { Container } from '@chakra-ui/react'
import { Box, Input, Stack   } from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import {useState} from "react";

const Home = () => {
    /*UseRef Hook In React*/
    const DynamicFunc = React.useRef(null);
    /*const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          DynamicFunc.current(e.target.value);
    };*/

    /*changeValue  function have to be called from the index.tsx*/
    const [value, setValue] = useState("Random Text");
    /* const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       changeValue(e.target.value);
   };

   const changeValue = (newValue) => {
       setValue(newValue);
   };*/

    /*This is to be completed by only using React references*/
    const textInput = React.createRef();
    const onChange = () => {
        DynamicFunc.current(textInput.current.value);
    };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container  maxW='container.xl' className={styles.main}>
          <Box p={15}
               shadow='md'
               width='400px'
               borderWidth='1px'>
              <FormControl id='email'>
                  <DynamicText  childFunc={DynamicFunc} value = {value}/>
                  <Input size='md' placeholder='Basic usage' onChange={onChange} ref={textInput} />

              </FormControl>
          </Box>

      </Container>
    </div>
  );
};

export default Home;

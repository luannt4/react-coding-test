import Head from "next/head";
import Router from "next/router";
import React, { useRef, createRef, useState, useEffect  } from 'react';
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";
import { Box, Input, FormControl ,Container, Button, Flex, Spacer  } from '@chakra-ui/react';
import { fireAuth, getPosts } from "../lib/firebase";
import Navigation from "../components/Navigation";

const Home = ({ posts }) => {

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
    const textInput = useRef<HTMLInputElement>(null);
    const onChange = () => {
        DynamicFunc.current(textInput.current?.value);
    };





    return (
        <div className={styles.container}>
            <Head>
                <title>Coding Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation/>
            <Container  maxW='container.xl' className={styles.main}>
                <Box p={15}
                     shadow='md'
                     width='500px'
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

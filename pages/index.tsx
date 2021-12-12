import Head from "next/head";
import Router from "next/router";
import React, { useRef, createRef, useState, useEffect  } from 'react';
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";
import { Box, Input, FormControl ,Container, Button, Flex, Spacer  } from '@chakra-ui/react';
import firebaseDb, { fireAuth } from "../lib/firebase";

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
    const textInput = useRef<HTMLInputElement>(null);
    const onChange = () => {
        DynamicFunc.current(textInput.current?.value);
    };

    const [user, setUser] = useState({});
    //const { authUser, loading, signOut } = useAuth();
    useEffect(() => {
        fireAuth.onAuthStateChanged((user) => {
            if (user) {
                console.log("user found");
                setUser(user);
            } else {
                console.log("no user");
                setUser(null);
            }
        });
    }, []);

    const onLogout = () => {
        fireAuth.signOut();
    };

    useEffect(() => {
        !user && Router.push("/login");
    }, [user]);
  console.log('user',user)
    return (
        <div className={styles.container}>
            <Head>
                <title>Coding Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container  maxW='container.xl' className={styles.main}>git
                <Flex width='500px' justify='flex-end' align='center'>
                    <Box p='2'>
                        { user && <div>Wellcome </div> }
                    </Box>
                    <Box p='2'>
                        <Button bg='tomato' color='white' onClick={() => onLogout()}>
                            Logout
                        </Button>
                    </Box>
                </Flex>

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

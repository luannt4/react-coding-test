import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { fireAuth, getPosts } from "../lib/firebase";
import React, {useEffect, useState} from "react";
import Router from "next/router";


const Navigation = () => {
    const { isOpen, onToggle } = useDisclosure();
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


    return (
        <Box width='100%'>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        Logo
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    align={'center'}
                    direction={'row'}
                    spacing={6}>
                    <Box p='2'>
                       git 
                    </Box>
                    <Box p='2'>
                        <Button bg='tomato' color='white' onClick={() => onLogout()}>
                            Logout
                        </Button>
                    </Box>
                </Stack>
            </Flex>

        </Box>
    );
}

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Blog',
        href: '/blog',
    },
];
const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                    </Popover>
                </Box>
            ))}
        </Stack>
    );

};


export default Navigation;

import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from "react";
import { Box, Heading, Text ,Container, Stack, Flex, Grid,  Image, Button  } from '@chakra-ui/react';
import {getPostBySlug, getPosts} from "../lib/firebase";
import Head from "next/head";
import Navigation from "../components/Navigation";
import { Link } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { Modal } from 'react-bootstrap';


export async function getServerSideProps() {
    const posts = await getPosts();
    return {
        props: {
            posts,
        },
    };
}

const BlockModal = (result) => {
    console.log(result);
    return (
        <div className={styles.PostPage} >
            <Box className={'card-img-containerdetail'} mb={5}>
                <Image  src={result.ImageUrl} alt={result.Title} />
            </Box>

            <Text color='gray.500'>{result.Contents}</Text>
            <Text mb={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                {result.Title}
            </Text>

            <p>
                {result.Description}
            </p>
        </div>
    );

};

const Blogs = (props) => {
    const [postData, setPostData] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [show, setShow] = useState(false);

    const { posts } = props;
    const handleClose = () => {
        setShow(false);
        setPostData([]);
    }

    const getServerSidePropsDeail = (postId) => {
        const postDeail =   getPostBySlug(postId);
        postDeail.then((result) => {
            setPostData(result);
        });

        setIsModal(true);
        setShow(true);
    };


    return (
        <div className={styles.container}>
            <Head>
                <title>Coding Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation />
            <Container  maxW='container.xl' className={styles.main}>
                <Heading>Blog Posts</Heading>
            </Container>

            <Container  maxW='container.xl' className={styles.main} pt={0}>
                <Grid templateColumns='repeat(4, 1fr)' gap={30}>
                {posts.map((post) => (
                    <Box  key={post.slug} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <div className={'card-img-container'}  onClick={ e => { getServerSidePropsDeail(post.Id - 1) }}>
                                <Image className={'card-image'} src={post.ImageUrl} alt={post.Title} />
                        </div>

                        <Box  p={5}>
                            <Text color='gray.500'>{post.Contents}</Text>
                            <Text mb={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                                <Link href={`blog/${post.Id - 1}`} isExternal>
                                    {post.Title}
                                </Link>

                            </Text>

                            <p
                                dangerouslySetInnerHTML={{
                                    __html: `${post.Description.substring(0, 100)}...`,
                                }}
                            ></p>git 
                        </Box>
                    </Box >
                ))}
                </Grid>
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {  BlockModal(postData)}
                </Modal.Body>

            </Modal>



        </div>

    );
}

export default Blogs;

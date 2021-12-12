import styles from "../../styles/Home.module.css";
import React from "react";
import { useRouter } from 'next/router';
import { Box, Heading, Text ,Container, Stack, Flex, Grid,  Image  } from '@chakra-ui/react';
import {getPostBySlug } from "../../lib/firebase";
import Head from "next/head";
import Navigation from "../../components/Navigation";

export async function getServerSideProps(context) {
    const post = await getPostBySlug(context.query.slug);
    return {
        props: {
            post,
        },
    };
}

const PostPage  = ({ post }) => {
    const router = useRouter();
    const { slug } = router.query;

   /* if (!post) {
        router.push('/404');
        return;
    }*/

    if (!post) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Coding Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation />

            <Container  maxW='container.xl' className={styles.main}>
                <Heading p={0} m={0}>Blog Detail</Heading>
            </Container>

            <Container  maxW='container.xl' className={styles.main} pt={0}>
                <div className={styles.PostPage}>
                    <Box className={'card-img-containerdetail'} mb={5}>
                        <Image  src={post.ImageUrl} alt={post.Title} />
                    </Box>

                    <Text color='gray.500'>{post.Contents}</Text>
                    <Text mb={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {post.Title}
                    </Text>

                    <p>
                        {post.Description}
                    </p>


                </div>
            </Container>
        </div>

    );
}

export default PostPage ;

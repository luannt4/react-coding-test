import styles from "../styles/Home.module.css";
import React from "react";
import { Box, Heading, Text ,Container, Stack, Flex, Grid,  Image  } from '@chakra-ui/react';
import {getPosts} from "../lib/firebase";
import Head from "next/head";
import Navigation from "../components/Navigation";
import { Link } from '@chakra-ui/react';

export async function getServerSideProps() {
    const posts = await getPosts();
    return {
        props: {
            posts,
        },
    };
}
const Blogs = ({ posts }) => {
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
                        <div className={'card-img-container'}>
                            <Link href={`blog/${post.Id - 1}`} isExternal>
                                <Image className={'card-image'} src={post.ImageUrl} alt={post.Title} />
                            </Link>
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
                            ></p>
                        </Box>
                    </Box >
                ))}
                </Grid>
            </Container>
        </div>

    );
}

export default Blogs;

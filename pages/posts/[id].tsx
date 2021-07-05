import Layout from '../../components/layout';
import {GetStaticPaths, GetStaticProps} from "next";
import {Data, getAllPostIds, getPostData, ParamId} from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css';
import Head from "next/head";
import Date from "../../components/date";

interface Props {
    postData: Data
}

const Post: React.FC<Props> = ({postData}) => {
    return (
        <>
            <Layout>
                <Head>
                    <title>{postData.title}</title>
                </Head>
                {postData.title}
                <article>
                    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                    <div className={utilStyles.lightText}>
                        <Date dateString={postData.date}/>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
                </article>
            </Layout>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
};
export const getStaticProps: GetStaticProps<{}, ParamId['params']> = async ({params}) => {
    const postData = await getPostData(params!.id);
    return {
        props: {
            postData
        }
    };
};

export default Post;

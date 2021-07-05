import Layout from '../../components/layout';
import {GetStaticPaths, GetStaticProps} from "next";
import {Data, getAllPostIds, getPostData, ParamId} from "../../lib/posts";

interface Props {
    postData: Data
}

const Post: React.FC<Props> = ({postData}) => {
    return (
        <>
            <Layout>
                {postData.title}
                <br/>
                {postData.id}
                <br/>
                {postData.date}
                <br/>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
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

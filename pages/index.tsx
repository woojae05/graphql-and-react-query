import { dehydrate, useQuery } from '@tanstack/react-query';
import request, { gql } from 'graphql-request';
import { queryClient } from './_app';

interface ProfileQuery {
  user: {
    id: string;
    login: string;
    avatar_url: string;
  };
}

const profilesQueryDocument = gql`
  query indexQuery($name: String!) {
    getUser(name: $name) {
      login
      id
      avatar_url
    }
    getUsers {
      id
      login
      avatar_url
    }
  }
`;

const getProfilesFetcher = async (): Promise<ProfileQuery[]> => {
  const data = await request<ProfileQuery[]>(
    process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
    profilesQueryDocument,
    { name: 'woojae05' }
  );
  return data;
};

export default function Home() {
  const { data } = useQuery<ProfileQuery[]>(['profiles'], () =>
    getProfilesFetcher()
  );

  return <div>{JSON.stringify(data)}</div>;
}

export const getStaticProps = async () => {
  await queryClient.prefetchQuery(['profiles'], getProfilesFetcher);

  return {
    props: {
      dehydatedState: dehydrate(queryClient),
    },
  };
};

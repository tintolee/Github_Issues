import type { NextPage, GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { IssueInterface } from "../src/types";
import { IssueComponent } from "../src/components/issue";
import { Pagination } from "../src/components/pagination";
import IssuesContext from "../src/context/issuesRepo.context";

interface Props {
  fetchedIssues: IssueInterface[];
}
const Home: NextPage<Props> = ({ fetchedIssues }) => {
  const { setIssuesData, currentIssues, setCurrentIssues, setFilteredIssues, itemsPerPage, filteredIssues} = useContext(IssuesContext);

  useEffect(() => {
    setIssuesData(fetchedIssues);
    setFilteredIssues(fetchedIssues.slice(0, itemsPerPage))
    setCurrentIssues(fetchedIssues.slice(0, itemsPerPage))
  }, [fetchedIssues]);

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>GitHub-GraphQl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-200 w-full lg:max-w-6xl h-screen pt-20 pb-16 px-4 auto overflow-scroll flex flex-col items-center">
        {
          filteredIssues.length < 0  && <p className="font-bold text-gray-600 mt-10">No Issues Found</p>
        }
        {currentIssues.length > 0 ? (
          <>
            <div className="mt-2 mb-6">
              {filteredIssues.map((issue) => (
                <IssueComponent key={issue.id} issue={issue} />
              ))}
            </div>
            <Pagination itemsPerPage={10} />
          </>
        ) : (
          <p className="mx-auto mt-10 h-8 w-8 border-gray-500 border-l-gray-300 border-x-4 border-y-4 rounded-full duration-800 ease-in-out animate-spin"></p>
        )}
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const httpLink = createHttpLink({
    uri: process.env.GITHUB_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,

        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        repository(name: "reactjs.org", owner: "reactjs") {
          issues(last: 50) {
            edges {
              node {
                id
                state
                # body
                # bodyText
                title
                createdAt
                author {
                  login
                }
                bodyText
                closedAt
                comments(first: 5) {
                  edges {
                    node {
                      id
                      bodyText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const { issues } = data.repository;

  const issuesData: IssueInterface[] = issues.edges.map(
    (issue: any) => issue.node
  );

  return {
    props: {
      fetchedIssues: issuesData,
    },
  };
};

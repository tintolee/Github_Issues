export interface IssueInterface {
    _typename: string;
    bodyText: string;
    author: {
        login: string;
    };
    closedAt: string;
    createdAt: string;
    comments: {};
    title: string;
    id: string;
    state: string;

}
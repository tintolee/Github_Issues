import React, {useState, createContext} from 'react';
import {IssueInterface} from '../types'

export interface IssuesContextInterface {
    issuesData: IssueInterface[];
    itemsPerPage: number;
    currentIssues: IssueInterface[];
    filteredIssues: IssueInterface[];
    setFilteredIssues: (data: IssueInterface[]) => void;
    setItemsPerPage: (n: number) => void;
    setIssuesData: (data: IssueInterface[]) => void;
    setCurrentIssues: (data: IssueInterface[]) => void;

} 

const initialValues:IssuesContextInterface = {
    issuesData: [],
    currentIssues: [],
    itemsPerPage: 5,
    filteredIssues: [],
    setFilteredIssues: () => {},
    setItemsPerPage: () => {},
    setCurrentIssues: () => {},
    setIssuesData: () => {}
}
const IssuesContext = createContext(initialValues);


export const IssuesContextProvider = ({children}: {children: React.ReactElement}) => {
    const [issuesData, setIssuesData] = useState<IssueInterface[]>([]);
    const [currentIssues, setCurrentIssues] = useState<IssueInterface[]>([]);
    const [filteredIssues, setFilteredIssues] = useState<IssueInterface[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);


    const setIssuesHandler = (data: IssueInterface[]) => {
        setIssuesData(data);
    } 

    const setCurrentIssuesHandler = (data: IssueInterface[]) => {
        setCurrentIssues(data);
    }

    const setItemsPerPageHandler = (n: number) => {
        setItemsPerPage(n);
    }

    const setFilteredIssueHandler = (data: IssueInterface[]) => {
        setFilteredIssues(data);
    }
    const value: IssuesContextInterface = {
        currentIssues,
        issuesData,
        itemsPerPage,
        filteredIssues,
        setFilteredIssues: setFilteredIssueHandler,
        setItemsPerPage: setItemsPerPageHandler,
        setCurrentIssues: setCurrentIssuesHandler,
        setIssuesData: setIssuesHandler,
    }
    return (
        <IssuesContext.Provider value={value}>
            {children}
        </IssuesContext.Provider>
    )
}

export default IssuesContext;
import React from "react";
import { IssueInterface } from "../../types";
import TimeAgo from "react-timeago";

interface Props {
  issue: IssueInterface;
}

export const IssueComponent: React.FC<Props> = ({ issue }) => {
  return (
    <div
      className={` flex flex-col  justify-around border-l-4 mb-2 bg-gray-300 h-60 p-4 rounded-md shadow-lg 
      shadow-gray-400 hover:bg-gray-100 duration-500 ease-in-out cursor-pointer ${
        issue.state === "OPEN"
          ? "border-l-yellow-500"
          : "border-l-green-500 "
      }`}
    >
      <h3 className="font-bold text-gray-800 mb-4">{issue.title}</h3>
      <div className="overflow-scroll h-4/5 text-gray-600">
          <p>{issue.bodyText}</p>
        <div className="flex space-x-8">
          <div className="flex items-center space-x-4 mt-4">
            <p>Created</p>
            <TimeAgo className="text-sm text-gray-500" date={issue.createdAt} />
          </div>
          {issue.state === "CLOSED" && (
            <div className="flex items-center space-x-4 mt-4">
              <p>Closed</p>
              <TimeAgo
                className="text-sm text-gray-500"
                date={issue.closedAt}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueComponent;

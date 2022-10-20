import React, { useState, useContext } from "react";
import Image from "next/image";
import IssuesContext from "../../context/issuesRepo.context";
import { IssueInterface } from "../../types";

const imgUrl =
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2l0aHVifGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";


export const NavBar = () => {
  const {currentIssues, setFilteredIssues, filteredIssues} = useContext(IssuesContext)
  const [filter, setFilter] = useState("all");

  const filterChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filterIssuesHandler = () => {
    console.log(filter)
    console.log(filteredIssues)
    if(filter === "all"){
      setFilteredIssues(currentIssues);
    }
    if(filter === "open"){
      console.log(currentIssues.filter(issues => issues.state === "OPEN"))
      setFilteredIssues(currentIssues.filter(issues => issues.state === "OPEN"));
    }
    
    if(filter === "closed"){
      setFilteredIssues(currentIssues.filter(issues => issues.state === "CLOSED"));
    }

  }
  return (
    <div className=" flex items-center bg-gray-600 w-screen lg:max-w-6xl p-4 rounded-sm mx-auto fixed top-0 left-0 right-0">
      <div className="flex items-center md:space-x-4">
        <div className="hidden md:inline-block relative h-12 w-12 rounded-full overflow-hidden shadow-md shadow-slate-400">
          <Image
            src={imgUrl}
            alt="github logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-sm md:text-base lg:text-lg font-bold text-purple-500">
          GitHub GraphQL
        </div>
      </div>
      <div className="flex h-full absolute flex-row items-center justify-end space-x-2 md:space-x-6 w-1/2 md:w-1/3 pr-4 right-0">
        <select className="w-1/2 rounded-lg cursor-pointer py-1 px-2" value={filter} onChange={(e) => filterChangeHandler(e)}>
          <option value="all" >All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={filterIssuesHandler} className="text-gray-100 py-2 px-4 opacity-70 hover:opacity-100 duration-500 ease-in-out active:scale-150
          rounded-xl text-sm md:text-base outline-none border-none bg-slate-800">
          Filter
        </button>
      </div>
    </div>
  );
};

export default NavBar;

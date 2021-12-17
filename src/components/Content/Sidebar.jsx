import React from 'react'
import { FaInbox, FaRegCalendarAlt } from "react-icons/fa"
import { MdToday } from "react-icons/md"

export const Sidebar = ({ seilectedTab, setSelectedTab }) => {
    return (
        <div className="sideBar">
            <div className={seilectedTab === "INBOX" ? 'active' : ""} onClick={() => { setSelectedTab('INBOX'); }}><FaInbox />Inbox</div>
            <div className={seilectedTab === "TODAY" ? 'active' : ""} onClick={() => setSelectedTab('TODAY')}> <MdToday />Today</div>
            <div className={seilectedTab === "NEXT_7" ? 'active' : ""} onClick={() => setSelectedTab('NEXT_7')}> <FaRegCalendarAlt /> Next 7 days</div>
        </div>
    )
}
export default Sidebar
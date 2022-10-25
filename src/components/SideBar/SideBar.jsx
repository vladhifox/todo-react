import SideBarHeader from './SideBarHeader';
import SideBarFooter from './SideBarFooter';
import SideBarContent from './SideBarContent';

const SideBar = ({ newListStatus ,delFormStatus}) => {

    return (<div className="sidebar">
        <div className="sidebar__body">
            <SideBarHeader />
            <SideBarContent newListStatus = {newListStatus} delFormStatus = {delFormStatus} />
        </div>

        <SideBarFooter />
    </div>);
}

export default SideBar;
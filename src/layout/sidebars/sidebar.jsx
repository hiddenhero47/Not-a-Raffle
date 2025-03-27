import React from 'react';
import {
	SidebarShell,
	RoutersBox,
	Options,
	RoutersBoxFoot,
	OptionsFoot,
} from './index.style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiFillHome } from "react-icons/ai";
import { IoIosSettings } from 'react-icons/io';
import { TbListDetails } from 'react-icons/tb';
import { MdDashboard } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slice/auth';
import { setTheme } from '../../store/slice/app-theme';
import { getFromLocalStorage } from '../../utilities/basicFunctions';

function Sidebar({ close }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const Logout = async () => {
		const myThemes = getFromLocalStorage('appThemes') || 'dark';
		await navigate('/auth');
		dispatch(logout());
		localStorage.clear();
		dispatch(setTheme(myThemes));
	};

	const handelClose = () => {
		if (close) {
			close();
		}
	};

	return (
		<>
			<SidebarShell>
				<div className="container">
					<div className="wrapper">
						<RoutersBox className="border-b-[2px] border-solid border-search-borderColor pb-[5px]">
							<Options $isActive={location.pathname === '/'}>
								<Link to="/" onClick={handelClose}>
									<i>
										<MdDashboard size={24} />
									</i>
									<span>Home</span>
								</Link>
							</Options>

							<Options $isActive={location.pathname.startsWith('/about-us')}>
								<Link to="about-us" onClick={handelClose}>
									<i>
										<TbListDetails size={24} />
									</i>
									<span>About us</span>
								</Link>
							</Options>
						</RoutersBox>

						<RoutersBoxFoot>
							<OptionsFoot
								$isActive={location.pathname.startsWith('/settings')}
							>
								<Link to="/settings" onClick={handelClose}>
									<i>
										<IoIosSettings size={24} />
									</i>
									<span>settings</span>
								</Link>
							</OptionsFoot>

							<OptionsFoot>
								<button
									onClick={() => Logout()}
									className="hover:text-sidebar-textHover text-sidebar-text"
								>
									<i>
										<BiLogOut size={24} />
									</i>
									<span>Log out</span>
								</button>
							</OptionsFoot>
						</RoutersBoxFoot>
					</div>
				</div>
			</SidebarShell>
		</>
	);
}

export default Sidebar;
